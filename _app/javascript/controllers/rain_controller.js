import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["icon"];

  connect() {
    this._onExternalToggle = this._onExternalToggle.bind(this);
    window.addEventListener("rain:toggle", this._onExternalToggle);

    const saved = localStorage.getItem("rain");
    this.isRaining = saved === "on";

    if (this.isRaining) {
      this.ensureRain();
    }

    this.updateIcon();
  }

  disconnect() {
    window.removeEventListener("rain:toggle", this._onExternalToggle);
  }

  toggle() {
    this.isRaining = !this.isRaining;

    if (this.isRaining) {
      this.startRain();
      localStorage.setItem("rain", "on");
    } else {
      this.stopRain();
      localStorage.setItem("rain", "off");
    }

    this.updateIcon();

    window.dispatchEvent(
      new CustomEvent("rain:toggle", { detail: { isRaining: this.isRaining } })
    );
  }

  ensureRain() {
    const existing = document.querySelector(".rain");
    if (existing) {
      this.rainContainer = existing;
      return;
    }
    this.rainContainer = document.createElement("div");
    this.rainContainer.classList.add("rain");
    document.body.appendChild(this.rainContainer);
    this._addDrops(100);
  }

  startRain() {
    if (document.querySelector(".rain")) {
      this.rainContainer = document.querySelector(".rain");
      return;
    }
    this.rainContainer = document.createElement("div");
    this.rainContainer.classList.add("rain");
    document.body.appendChild(this.rainContainer);
    this._addDrops(100);
  }

  stopRain() {
    const existing = document.querySelector(".rain");
    if (existing) {
      existing.remove();
    }
    this.rainContainer = null;
  }

  _addDrops(count = 100) {
    if (!this.rainContainer) return;
    this.rainContainer.innerHTML = "";
    const w = window.innerWidth;
    for (let i = 0; i < count; i++) {
      const drop = document.createElement("div");
      drop.className = "drop";
      drop.style.left = Math.random() * w + "px";
      drop.style.animationDuration =
        (0.5 + Math.random() * 0.8).toFixed(2) + "s";
      drop.style.opacity = (0.2 + Math.random() * 0.8).toString();
      this.rainContainer.appendChild(drop);
    }
  }

  updateIcon() {
    this.iconTargets.forEach((icon) => {
      icon.innerHTML = this.isRaining ? this.rainOnIcon() : this.rainOffIcon();
    });
  }

  _onExternalToggle(e) {
    const external = !!e?.detail?.isRaining;
    if (external === this.isRaining) return;

    this.isRaining = external;
    if (this.isRaining) {
      this.ensureRain();
    } else {
      this.stopRain();
    }
    this.updateIcon();
  }

  rainOffIcon() {
    return `
    <svg xmlns="http://www.w3.org/2000/svg"
         fill="none" viewBox="0 0 24 24"
         stroke-width="1.5" stroke="currentColor"
         class="w-6 h-6 text-gray-500">
      <!-- Awan -->
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M3 15.75a4.5 4.5 0 014.5-4.5h.75a6 6 0 1111.25 1.607
           4.5 4.5 0 01-.75 8.893H7.5a4.5 4.5 0 01-4.5-4.5z" />
      <!-- Tetes hujan -->
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M9 20.25v1.5M12 19.5v1.5M15 20.25v1.5" />
      <!-- Garis coret diagonal -->
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M18 6L6 18" stroke-width="2" />
    </svg>
  `;
  }

  rainOnIcon() {
    return `
    <svg xmlns="http://www.w3.org/2000/svg"
         fill="none" viewBox="0 0 24 24"
         stroke-width="1.5" stroke="currentColor"
         class="w-6 h-6 text-blue-300">
      <!-- Awan -->
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M3 15.75a4.5 4.5 0 014.5-4.5h.75a6 6 0 1111.25 1.607
           4.5 4.5 0 01-.75 8.893H7.5a4.5 4.5 0 01-4.5-4.5z" />
      <!-- Tetes hujan -->
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M9 20.25v1.5M12 19.5v1.5M15 20.25v1.5" />
    </svg>
  `;
  }
}
