let currentStage = 0;
const totalStages = 8;

// Ball positions in zigzag pattern (top, left)
const ballPositions = [
    { top: 20, left: 10 },     // Start
    { top: 200, left: 80 },    // Stage 1
    { top: 350, left: 15 },    // Stage 2
    { top: 500, left: 75 },    // Stage 3
    { top: 650, left: 20 },    // Stage 4
    { top: 800, left: 70 },    // Stage 5
    { top: 950, left: 25 },    // Stage 6
    { top: 1100, left: 50 }    // Stage 7
];

// Content for each stage
const stageContent = [
    {
        title: "Welcome to the Journey!",
        content: `
            <p>Hi! I'm <strong>Nishit</strong>, your rolling guide through the complete Linux boot process.</p>
            <p>A bootloader is a small program that starts when you turn on your computer. It prepares hardware and loads the OS kernel into memory.</p>
            <div class="info-card">
                <h3>What We'll Explore:</h3>
                <ul>
                    <li>Power-on sequence and CPU initialization</li>
                    <li>BIOS/UEFI firmware operations</li>
                    <li>POST (Power-On Self-Test)</li>
                    <li>MBR vs ESP boot structures</li>
                    <li>GRUB bootloader mechanism</li>
                    <li>Kernel initialization process</li>
                    <li>systemd/init system startup</li>
                    <li>User space transition</li>
                </ul>
            </div>
            <div class="speech-bubble">
                <p>Ready to roll? Click Next to start our journey from power button to login screen!</p>
            </div>
        `
    },
    {
        title: "Stage 1: Power On & Reset Vector",
        content: `
            <p>When you press the power button, electricity flows through the motherboard. The CPU powers up and begins execution.</p>
            <div class="info-card">
                <h3>The Reset Vector</h3>
                <p>The CPU is <strong>hard-wired</strong> to start executing instructions from a fixed memory address called the <strong>"Reset Vector"</strong>. This is the CPU's starting point.</p>
                <p>The reset vector actually maps to firmware stored in non-volatile memory (ROM or Flash memory) on the motherboard. This firmware is commonly known as BIOS or UEFI.</p>
            </div>
            <div class="info-card">
                <h3>Why Firmware?</h3>
                <p>Firmware is a special type of program stored directly on the motherboard by vendors/manufacturers (Dell, HP, Lenovo, etc.). It's the bridge between hardware and software.</p>
                <p><strong>Note:</strong> Modern systems don't use traditional read-only ROM anymore. They use Flash memory, which can be updated (firmware updates).</p>
            </div>
            <div class="speech-bubble">
                <p>Rolling into action! The reset vector is my GPS coordinates - telling the CPU exactly where to start!</p>
            </div>
        `
    },
    {
        title: "Stage 2: BIOS vs UEFI Firmware",
        content: `
            <p>After the CPU powers up, the firmware takes complete control of the system. This firmware comes in two flavors:</p>
            <div class="comparison-grid">
                <div class="compare-card">
                    <h3>BIOS (Legacy)</h3>
                    <p><strong>Basic Input Output System</strong></p>
                    <ul>
                        <li>Traditional firmware</li>
                        <li>Uses MBR (Master Boot Record)</li>
                        <li>Limited to 2TB drive size</li>
                        <li>16-bit processor mode</li>
                        <li>Text-based interface</li>
                        <li>Slower boot process</li>
                        <li>No secure boot support</li>
                    </ul>
                </div>
                <div class="compare-card">
                    <h3>UEFI (Modern)</h3>
                    <p><strong>Unified Extensible Firmware Interface</strong></p>
                    <ul>
                        <li>Modern firmware standard</li>
                        <li>Uses GPT (GUID Partition Table)</li>
                        <li>Supports drives over 2TB</li>
                        <li>32-bit or 64-bit mode</li>
                        <li>Graphical interface with mouse</li>
                        <li>Faster boot with parallel loading</li>
                        <li>Secure Boot enabled</li>
                    </ul>
                </div>
            </div>
            <div class="info-card">
                <h3>Key Difference</h3>
                <p>BIOS reads the first 512 bytes (MBR), while UEFI reads from a special FAT32 partition called ESP (EFI System Partition) and executes .efi files directly.</p>
            </div>
            <div class="speech-bubble">
                <p>UEFI is like upgrading from a paper map to GPS - smarter, faster, and more secure!</p>
            </div>
        `
    },
    {
        title: "Stage 3: POST - Power-On Self-Test",
        content: `
            <p>Before attempting to boot the OS, the firmware runs a comprehensive hardware check called POST.</p>
            <div class="info-card">
                <h3>Hardware Verification Process</h3>
                <ul>
                    <li>✓ CPU functionality test</li>
                    <li>✓ Memory (RAM) integrity check</li>
                    <li>✓ Keyboard and mouse detection</li>
                    <li>✓ Storage devices (HDD/SSD/NVMe) scan</li>
                    <li>✓ Graphics card initialization</li>
                    <li>✓ Network interface detection</li>
                    <li>✓ USB controller check</li>
                </ul>
            </div>
            <div class="info-card">
                <h3>After POST</h3>
                <p>Once all checks pass, firmware searches for a <strong>bootable device</strong> in the boot order:</p>
                <ul>
                    <li>Internal HDD/SSD</li>
                    <li>USB drives (Pendrive)</li>
                    <li>Network boot (PXE)</li>
                    <li>CD/DVD drives</li>
                </ul>
                <p>The firmware looks for boot signatures to identify bootable media.</p>
            </div>
            <div class="speech-bubble">
                <p>POST is like my pre-race inspection - making sure everything works before the main event!</p>
            </div>
        `
    },
    {
        title: "Stage 4: Boot Device Structure - MBR vs ESP",
        content: `
            <p>Once a bootable device is found, the firmware needs to locate the bootloader. The structure differs between BIOS and UEFI:</p>
            <div class="disk-structure">
                <h4>BIOS System - MBR (Master Boot Record)</h4>
                <div class="disk-parts">
                    <div class="disk-part">
                        <strong>MBR</strong>
                        <p>512 bytes</p>
                        <p>First sector</p>
                    </div>
                    <div class="disk-part">
                        <strong>Bootloader</strong>
                        <p>GRUB Stage 1.5</p>
                        <p>Core image</p>
                    </div>
                    <div class="disk-part">
                        <strong>OS Partition</strong>
                        <p>Linux kernel</p>
                        <p>Root filesystem</p>
                    </div>
                </div>
                <p><strong>MBR Contents:</strong></p>
                <ul>
                    <li>Bootloader code: 446 bytes (loads GRUB)</li>
                    <li>Partition table: 64 bytes (location of partitions)</li>
                    <li>Boot signature: 2 bytes (0x55AA - indicates valid MBR)</li>
                </ul>
            </div>
            <div class="disk-structure">
                <h4>UEFI System - ESP (EFI System Partition)</h4>
                <div class="disk-parts">
                    <div class="disk-part">
                        <strong>GPT Table</strong>
                        <p>GUID entries</p>
                        <p>Partition info</p>
                    </div>
                    <div class="disk-part">
                        <strong>ESP</strong>
                        <p>100-500 MB</p>
                        <p>FAT32 format</p>
                    </div>
                    <div class="disk-part">
                        <strong>OS Partition</strong>
                        <p>Linux & data</p>
                        <p>ext4/btrfs/xfs</p>
                    </div>
                </div>
                <p><strong>ESP Details:</strong> Special FAT32 partition containing EFI executables like <code>grubx64.efi</code>, <code>shimx64.efi</code> for Secure Boot.</p>
            </div>
            <div class="speech-bubble">
                <p>MBR vs ESP is like old filing cabinet vs modern database - both store info, but ESP is way more organized!</p>
            </div>
        `
    },
    {
        title: "Stage 5: GRUB Bootloader",
        content: `
            <p>GRUB (GRand Unified Bootloader) is now loaded into RAM. Modern Linux systems use GRUB2.</p>
            <div class="terminal-box">
                GNU GRUB version 2.06<br>
                ═══════════════════════════════════════<br><br>
                ► Linux Kernel 6.5.0 (default)<br>
                &nbsp;&nbsp;Advanced options for Linux<br>
                &nbsp;&nbsp;Windows Boot Manager (if dual boot)<br>
                &nbsp;&nbsp;Memory Test (memtest86+)<br>
                &nbsp;&nbsp;UEFI Firmware Settings
            </div>
            <div class="info-card">
                <h3>GRUB's Critical Jobs</h3>
                <ul>
                    <li><strong>Read configuration:</strong> Parses /boot/grub/grub.cfg</li>
                    <li><strong>Display menu:</strong> Shows OS selection (text or graphical)</li>
                    <li><strong>Locate kernel:</strong> Finds vmlinuz (compressed kernel binary)</li>
                    <li><strong>Load initramfs:</strong> Loads initrd/initramfs (temporary root filesystem)</li>
                    <li><strong>Set parameters:</strong> Passes kernel command-line arguments</li>
                    <li><strong>Transfer control:</strong> Jumps to kernel entry point</li>
                </ul>
            </div>
            <div class="code-block">
# Example GRUB menu entry<br>
menuentry "Linux" {<br>
&nbsp;&nbsp;linux /boot/vmlinuz root=/dev/sda1 ro quiet<br>
&nbsp;&nbsp;initrd /boot/initramfs.img<br>
}
            </div>
            <div class="info-card">
                <h3>Chain Loading</h3>
                <p>GRUB can also "chain load" other bootloaders. This is how dual-boot systems work - GRUB can hand off control to Windows Boot Manager for booting Windows.</p>
            </div>
            <div class="speech-bubble">
                <p>GRUB is the traffic controller - directing you to Linux, Windows, or whatever OS you choose!</p>
            </div>
        `
    },
    {
        title: "Stage 6: Linux Kernel Initialization",
        content: `
            <p>The Linux kernel is the core program that controls ALL hardware and manages the entire operating system.</p>
            <div class="process-flow">
                <div class="flow-step">
                    <div class="step-num">1</div>
                    <div class="step-content">
                        <h4>Decompression</h4>
                        <p>Kernel (vmlinuz) is compressed. It decompresses itself in memory to save storage space.</p>
                    </div>
                </div>
                <div class="flow-step">
                    <div class="step-num">2</div>
                    <div class="step-content">
                        <h4>Hardware Detection & Initialization</h4>
                        <p>Kernel probes and identifies all hardware components - CPU, RAM, disks, network cards, etc.</p>
                    </div>
                </div>
                <div class="flow-step">
                    <div class="step-num">3</div>
                    <div class="step-content">
                        <h4>Driver Loading (initramfs)</h4>
                        <p>Loads essential device drivers from initramfs - a temporary mini-filesystem in RAM containing kernel modules.</p>
                    </div>
                </div>
                <div class="flow-step">
                    <div class="step-num">4</div>
                    <div class="step-content">
                        <h4>Mount Root Filesystem</h4>
                        <p>Once storage drivers load, kernel mounts the actual root filesystem (/) from disk. initramfs is discarded.</p>
                    </div>
                </div>
                <div class="flow-step">
                    <div class="step-num">5</div>
                    <div class="step-content">
                        <h4>Launch Init Process</h4>
                        <p>Kernel starts the first user-space process: /sbin/init or /lib/systemd/systemd with PID 1.</p>
                    </div>
                </div>
            </div>
            <div class="info-card">
                <h3>Kernel's Role</h3>
                <p>The kernel manages memory, schedules processes, handles system calls, controls hardware via drivers, and provides security. It's the bridge between applications and hardware.</p>
            </div>
            <div class="speech-bubble">
                <p>The kernel is the brain of the OS - it wakes up, learns about the body (hardware), and starts coordinating everything!</p>
            </div>
        `
    },
    {
        title: "Stage 7: systemd/init - First Process (PID 1)",
        content: `
            <p>The kernel launches the very first user-space process with Process ID 1. This is the init system.</p>
            <div class="comparison-grid">
                <div class="compare-card">
                    <h3>SysVinit (Old)</h3>
                    <p><strong>Traditional Init</strong></p>
                    <ul>
                        <li>Sequential service startup</li>
                        <li>One service at a time</li>
                        <li>Shell script-based (/etc/init.d/)</li>
                        <li>Slower boot times (30-60 seconds)</li>
                        <li>Simple dependency handling</li>
                        <li>Runlevels (0-6)</li>
                    </ul>
                </div>
                <div class="compare-card">
                    <h3>systemd (Modern)</h3>
                    <p><strong>System and Service Manager</strong></p>
                    <ul>
                        <li>Parallel service startup</li>
                        <li>Multiple services simultaneously</li>
                        <li>Binary-based with unit files</li>
                        <li>Much faster boots (10-15 seconds)</li>
                        <li>Advanced dependency resolution</li>
                        <li>Targets (equivalent to runlevels)</li>
                    </ul>
                </div>
            </div>
            <div class="info-card">
                <h3>systemd Targets (Runlevels)</h3>
                <ul>
                    <li><strong>poweroff.target:</strong> Shutdown system (Runlevel 0)</li>
                    <li><strong>rescue.target:</strong> Single-user mode for maintenance (Runlevel 1)</li>
                    <li><strong>multi-user.target:</strong> Multi-user CLI, no GUI (Runlevel 3)</li>
                    <li><strong>graphical.target:</strong> Multi-user with desktop environment (Runlevel 5)</li>
                    <li><strong>reboot.target:</strong> Reboot system (Runlevel 6)</li>
                </ul>
            </div>
            <div class="info-card">
                <h3>What systemd Does</h3>
                <p>Mounts all filesystems (/home, /var, /usr), starts essential services (networking, display manager, sound system), manages daemons, and brings the system to the target state (usually graphical.target).</p>
                <p>It continues managing services throughout system uptime - starting, stopping, restarting as needed.</p>
            </div>
            <div class="speech-bubble">
                <p>systemd is like a parallel race - all services start together instead of waiting in line!</p>
            </div>
        `
    },
    {
        title: "Stage 8: System Ready - User Space",
        content: `
            <p>Congratulations! The system has fully booted and is now ready for user interaction!</p>
            <div class="completion-banner">
                <h3>🎉 Boot Sequence Complete!</h3>
                <div class="boot-flow">
                    Power Button → Reset Vector → BIOS/UEFI → POST → MBR/ESP → GRUB → Kernel → systemd → User Space
                </div>
                <p>On modern hardware with SSDs, this entire process takes just 10-30 seconds!</p>
            </div>
            <div class="info-card">
                <h3>User Space vs Kernel Space</h3>
                <p><strong>User Space:</strong> Where normal applications run (browsers, editors, games). These programs interact with hardware through system calls to the kernel.</p>
                <p><strong>Kernel Space:</strong> Where the kernel operates, handling low-level tasks like memory management, process scheduling, device drivers, and hardware control. User programs cannot directly access kernel space.</p>
            </div>
            <div class="info-card">
                <h3>What Happens Next?</h3>
                <ul>
                    <li><strong>Display Manager loads:</strong> GDM, SDDM, or LightDM shows login screen</li>
                    <li><strong>Desktop Environment starts:</strong> GNOME, KDE Plasma, XFCE, etc.</li>
                    <li><strong>User session begins:</strong> Window manager, panels, and background services start</li>
                    <li><strong>Applications launch:</strong> You can now open browsers, terminals, file managers</li>
                </ul>
            </div>
            <div class="info-card">
                <h3>Key Takeaway</h3>
                <p>The bootloader bridges the gap between hardware (POST, firmware) and software (kernel, init system). It's the crucial link that makes your computer usable!</p>
            </div>
            <div class="speech-bubble">
                <p>We made it from power button to desktop! What an incredible journey through the boot process!</p>
            </div>
        `
    }
];

// Get elements
const ball = document.getElementById('ball');
const contentBox = document.getElementById('contentBox');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pathMarkers = document.querySelectorAll('.path-marker');
const trackContainer = document.querySelector('.track-container');

// Initialize
updateStage();

// Next button
nextBtn.addEventListener('click', () => {
    if (currentStage < totalStages) {
        currentStage++;
        updateStage();
    }
});

// Previous button
prevBtn.addEventListener('click', () => {
    if (currentStage > 0) {
        currentStage--;
        updateStage();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && currentStage < totalStages) {
        currentStage++;
        updateStage();
    } else if (e.key === 'ArrowLeft' && currentStage > 0) {
        currentStage--;
        updateStage();
    }
});

function updateStage() {
    // Move ball to position with rolling animation
    const pos = ballPositions[currentStage];
    ball.style.top = `${pos.top}px`;
    ball.style.left = `${pos.left}%`;

    // Trigger roll animation
    const svg = ball.querySelector('svg');
    svg.style.animation = 'none';
    setTimeout(() => {
        svg.style.animation = 'roll 1.2s ease-in-out';
    }, 10);

    // Update path markers
    pathMarkers.forEach((marker, index) => {
        if (index === currentStage) {
            marker.classList.add('active');
        } else {
            marker.classList.remove('active');
        }
    });

    // Update content box
    contentBox.innerHTML = `
        <h2>${stageContent[currentStage].title}</h2>
        ${stageContent[currentStage].content}
    `;
    contentBox.classList.add('show');
    contentBox.style.top = `${pos.top + 80}px`;

    // Adjust track container height dynamically
    const contentHeight = contentBox.offsetHeight;
    const minHeight = pos.top + contentHeight + 150;
    trackContainer.style.minHeight = `${minHeight}px`;

    // Update button states
    prevBtn.disabled = currentStage === 0;

    if (currentStage === totalStages) {
        nextBtn.innerHTML = 'Finish <span>✓</span>';
    } else {
        nextBtn.innerHTML = 'Next <span>→</span>';
    }

    // Scroll to ball position
    setTimeout(() => {
        window.scrollTo({
            top: ball.offsetTop - 100,
            behavior: 'smooth'
        });
    }, 100);
}
