import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["text"];
  static values = {
    words: Array,
    loop: { type: Boolean, default: true },
  };

  connect() {
    this.index = 0;
    this.isDeleting = false;
    this.txt = "";
    this.wordsList = this.wordsValue.length ? this.wordsValue : ["Hello World"];
    this.type();
  }

  type() {
    const currentWord = this.wordsList[this.index % this.wordsList.length];
    const fullTxt = currentWord;

    this.txt = this.isDeleting
      ? fullTxt.substring(0, this.txt.length - 1)
      : fullTxt.substring(0, this.txt.length + 1);

    this.textTarget.innerHTML = `${this.txt}<span class="blinking-cursor">|</span>`;

    let speed = this.isDeleting ? 50 : 100;

    if (!this.isDeleting && this.txt === fullTxt) {
      speed = 2400;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.index++;
      speed = 1100;

      if (!this.loopValue && this.index >= this.wordsList.length) return;
    }

    setTimeout(() => this.type(), speed);
  }
}
