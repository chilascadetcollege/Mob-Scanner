// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then((reg) => {
            console.log('SW registered:', reg.scope);
        }).catch((err) => console.log('SW registration failed:', err));
    });
}

// Elements Configuration
const els = {
    splash: document.getElementById('splashScreen'),
    app: document.getElementById('appContainer'),
    screens: {
        camera: document.getElementById('cameraScreen'),
        crop: document.getElementById('cropScreen'),
        edit: document.getElementById('editScreen'),
        save: document.getElementById('saveScreen')
    },
    camera: {
        feed: document.getElementById('cameraFeed'),
        captureBtn: document.getElementById('btnCapture'),
        switchBtn: document.getElementById('btnSwitchCamera'),
        uploadBtn: document.getElementById('imageUpload'),
        flashBtn: document.getElementById('btnFlash')
    },
    crop: {
        img: document.getElementById('imageToCrop'),
        cancelBtn: document.getElementById('btnCancelCrop'),
        doneBtn: document.getElementById('btnDoneCrop'),
        rotateBtn: document.getElementById('btnRotateView')
    },
    edit: {
        canvas: document.getElementById('filterCanvas'),
        backBtn: document.getElementById('btnBackToCrop'),
        proceedBtn: document.getElementById('btnProceedSave'),
        filters: document.querySelectorAll('.filter-option')
    },
    save: {
        img: document.getElementById('finalImage'),
        backBtn: document.getElementById('btnBackToEdit'),
        docName: document.getElementById('docName'),
        jpgBtn: document.getElementById('btnSaveJPG'),
        pdfBtn: document.getElementById('btnSavePDF'),
        shareBtn: document.getElementById('btnShare'),
        newBtn: document.getElementById('btnNewScan'),
        upgradeBtn: document.getElementById('btnUpgradePrompt')
    },
    pro: {
        screen: document.getElementById('proScreen'),
        backBtn: document.getElementById('btnBackFromPro'),
        buyBtn: document.getElementById('btnBuyPro')
    }
};

let stream = null;
let currentFacingMode = 'environment';
let imageCapture = null;
let cropper = null;
let originalImageBase64 = null;
let croppedImageBase64 = null;
let filteredImageBase64 = null;
let isProUser = false;
let currentFilterType = 'original';

// Splash Screen Logic
setTimeout(() => {
    els.splash.classList.remove('active');
    els.splash.classList.add('hidden');
    els.app.classList.remove('hidden');
    initCamera();
}, 2000);

// Helper: Switch Screens
function showScreen(screenKey) {
    Object.values(els.screens).forEach(s => s.classList.add('hidden'));
    els.screens[screenKey].classList.remove('hidden');
}

// Memory Optimization: Clear unused variables
function clearUnusedMemory() {
    originalImageBase64 = null;
    if (cropper) {
        cropper.destroy();
        cropper = null;
    }
}

// --- Pro Screen Logic ---
els.save.upgradeBtn.addEventListener('click', () => {
    els.pro.screen.classList.remove('hidden');
});

els.pro.backBtn.addEventListener('click', () => {
    els.pro.screen.classList.add('hidden');
});

els.pro.buyBtn.addEventListener('click', () => {
    alert("Pro Version Unlocked! (Mock Payment Success)");
    isProUser = true;
    els.save.upgradeBtn.classList.add('hidden');
    els.pro.screen.classList.add('hidden');
    // Re-apply filter without watermark
    applyFilter(currentFilterType);
    setTimeout(() => {
        filteredImageBase64 = els.edit.canvas.toDataURL('image/jpeg', 0.9);
        els.save.img.src = filteredImageBase64;
    }, 500);
});

// --- 1. Camera Logic ---
async function initCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: currentFacingMode, width: { ideal: 1920 }, height: { ideal: 1080 } },
            audio: false
        });
        els.camera.feed.srcObject = stream;
        
        // Flash support check
        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities ? track.getCapabilities() : null;
        if (capabilities && capabilities.torch) {
            els.camera.flashBtn.disabled = false;
            imageCapture = new ImageCapture(track);
        } else {
            els.camera.flashBtn.disabled = true;
        }
    } catch (err) {
        console.error("Camera access denied or unvailable.", err);
        alert("کیمرہ شروع کرنے میں مسئلہ ہوا۔ براہ کرم اجازت دیں۔ (Camera Permission Required)");
    }
}

let flashOn = false;
els.camera.flashBtn.addEventListener('click', async () => {
    if (!stream) return;
    const track = stream.getVideoTracks()[0];
    flashOn = !flashOn;
    try {
        await track.applyConstraints({ advanced: [{ torch: flashOn }] });
        els.camera.flashBtn.style.color = flashOn ? 'gold' : 'white';
    } catch (e) {
        console.log("Flash not supported");
    }
});

els.camera.switchBtn.addEventListener('click', () => {
    currentFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
    initCamera();
});

els.camera.captureBtn.addEventListener('click', () => {
    const video = els.camera.feed;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    originalImageBase64 = canvas.toDataURL('image/jpeg', 1.0);
    loadToCropScreen(originalImageBase64);
});

els.camera.uploadBtn.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (ev) => {
            originalImageBase64 = ev.target.result;
            loadToCropScreen(originalImageBase64);
        };
        reader.readAsDataURL(e.target.files[0]);
    }
});

// --- 2. Crop Logic ---
function loadToCropScreen(imgData) {
    showScreen('crop');
    els.crop.img.src = imgData;
    if (cropper) cropper.destroy();
    
    // Wait for image to render
    setTimeout(() => {
        cropper = new Cropper(els.crop.img, {
            viewMode: 1,
            dragMode: 'move',
            autoCropArea: 0.9,
            restore: false,
            guides: true,
            center: true,
            highlight: false,
            cropBoxMovable: true,
            cropBoxResizable: true,
            toggleDragModeOnDblclick: false,
        });
    }, 100);
}

els.crop.cancelBtn.addEventListener('click', () => {
    showScreen('camera');
});

els.crop.rotateBtn.addEventListener('click', () => {
    if (cropper) cropper.rotate(90);
});

els.crop.doneBtn.addEventListener('click', () => {
    if (!cropper) return;
    const canvas = cropper.getCroppedCanvas({
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high',
    });
    croppedImageBase64 = canvas.toDataURL('image/jpeg', 1.0);
    loadToEditScreen(croppedImageBase64);
});

// --- 3. Filter/Edit Logic ---
function loadToEditScreen(imgData) {
    showScreen('edit');
    applyFilter('original');
}

els.edit.backBtn.addEventListener('click', () => showScreen('crop'));

els.edit.filters.forEach(btn => {
    btn.addEventListener('click', function() {
        els.edit.filters.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        applyFilter(this.dataset.filter);
    });
});

els.edit.proceedBtn.addEventListener('click', () => {
    // Memory optimizations: clear original image
    clearUnusedMemory();

    // Save current canvas state to filteredImageBase64
    filteredImageBase64 = els.edit.canvas.toDataURL('image/jpeg', 0.9);
    
    // Auto-generate doc name
    const date = new Date();
    els.save.docName.value = `MobScanner_${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2,'0')}${date.getDate().toString().padStart(2,'0')}_${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
    
    loadToSaveScreen();
});

function applyFilter(filterType) {
    currentFilterType = filterType;
    const img = new Image();
    img.onload = () => {
        const c = els.edit.canvas;
        const ctx = c.getContext('2d', { willReadFrequently: true });
        
        ctx.clearRect(0, 0, c.width, c.height); // Memory optimization
        c.width = img.width;
        c.height = img.height;

        ctx.drawImage(img, 0, 0);

        if (filterType === 'original') return;

        const imgData = ctx.getImageData(0, 0, c.width, c.height);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
            let r = data[i], g = data[i+1], b = data[i+2];

            if (filterType === 'grayscale') {
                const avg = 0.3 * r + 0.59 * g + 0.11 * b;
                data[i] = data[i+1] = data[i+2] = avg;
            } 
            else if (filterType === 'high_contrast') {
                // simple high contrast threshold black and white
                const avg = 0.3 * r + 0.59 * g + 0.11 * b;
                const threshold = 128;
                const v = avg > threshold ? 255 : 0;
                data[i] = data[i+1] = data[i+2] = v;
            } 
            else if (filterType === 'magic') {
                // Increase exposure and saturation (Simulated Magic Color)
                const adjustContrast = 1.3;
                const intercept = 128 * (1 - adjustContrast);
                
                let nr = r * adjustContrast + intercept;
                let ng = g * adjustContrast + intercept;
                let nb = b * adjustContrast + intercept;

                // slight warmth / brightness
                nr = Math.min(255, nr * 1.1);
                ng = Math.min(255, ng * 1.1);
                nb = Math.min(255, nb * 1.05);

                data[i] = nr;
                data[i+1] = ng;
                data[i+2] = nb;
            }
        }
        if (filterType !== 'original') {
            ctx.putImageData(imgData, 0, 0);
        }

        // Apply Watermark if free user
        if (!isProUser) {
            const wmText = "Scanned with Mob Scanner";
            const fontSize = Math.max(20, Math.floor(c.width * 0.03));
            ctx.font = `bold ${fontSize}px Inter, sans-serif`;
            
            // Background box for watermark
            const padding = 15;
            const textWidth = ctx.measureText(wmText).width;
            
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            ctx.fillRect(c.width - textWidth - (padding*2) - 10, c.height - fontSize - (padding*2) - 10, textWidth + (padding*2), fontSize + (padding*2));

            // Text
            ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
            ctx.fillText(wmText, c.width - textWidth - padding - 10, c.height - padding - 15);
        }
    };
    img.src = croppedImageBase64;
}

// --- 4. Save and Share Logic ---
function loadToSaveScreen() {
    showScreen('save');
    els.save.img.src = filteredImageBase64;
}

els.save.backBtn.addEventListener('click', () => showScreen('edit'));

els.save.newBtn.addEventListener('click', () => {
    // Reset and go back to camera
    originalImageBase64 = null;
    croppedImageBase64 = null;
    filteredImageBase64 = null;
    els.save.docName.value = "";
    els.camera.uploadBtn.value = "";
    showScreen('camera');
});

// Save as PDF
els.save.pdfBtn.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    
    // Calculate A4 dimensions (Portrait)
    // A4 is 210 x 297 mm
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const img = new Image();
    img.src = filteredImageBase64;
    img.onload = () => {
        const imgRatio = img.width / img.height;
        const pdfRatio = pdfWidth / pdfHeight;

        let renderWidth = pdfWidth;
        let renderHeight = pdfWidth / imgRatio;

        if (renderHeight > pdfHeight) {
            renderHeight = pdfHeight;
            renderWidth = renderHeight * imgRatio;
        }

        const xOffset = (pdfWidth - renderWidth) / 2;
        const yOffset = (pdfHeight - renderHeight) / 2;

        // Compression for free users using image quality param
        const quality = isProUser ? 1.0 : 0.7;

        // Clear unused memory to handle large PDFs without crashing
        const compressedBase64 = isProUser ? filteredImageBase64 : els.edit.canvas.toDataURL('image/jpeg', quality);

        pdf.addImage(compressedBase64, 'JPEG', xOffset, yOffset, renderWidth, renderHeight);
        pdf.save(`${els.save.docName.value}.pdf`);
    };
});

// Save as JPG
els.save.jpgBtn.addEventListener('click', () => {
    const a = document.createElement('a');
    a.href = filteredImageBase64;
    a.download = `${els.save.docName.value}.jpg`;
    a.click();
});

// Share via API
els.save.shareBtn.addEventListener('click', async () => {
    if (navigator.share) {
        try {
            // Convert base64 to File object to share as image
            const res = await fetch(filteredImageBase64);
            const blob = await res.blob();
            const file = new File([blob], `${els.save.docName.value}.jpg`, { type: 'image/jpeg' });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: els.save.docName.value,
                    text: 'Mob Scanner سے سکین کردہ ڈاکومنٹ (Scanned via Mob Scanner)',
                    files: [file]
                });
            } else {
                console.log("System doesn't support sharing files.");
                alert("آپ کا براؤزر فائل شیئرنگ سپورٹ نہیں کرتا۔");
            }
        } catch (error) {
            console.error('Error sharing', error);
        }
    } else {
        alert("Web Share API not supported on this browser.");
    }
});
