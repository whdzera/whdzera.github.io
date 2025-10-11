import { Controller } from "@hotwired/stimulus";

export default class CopyController extends Controller {
  connect() {
    document.querySelectorAll("pre > code").forEach((codeBlock) => {
      const pre = codeBlock.parentNode;

      if (pre.parentNode.classList.contains("code-wrapper")) return;

      const wrapper = document.createElement("div");
      wrapper.className = "relative rounded mb-4 code-wrapper";

      const button = document.createElement("button");
      button.innerHTML = this.copyIcon();
      button.className =
        "absolute top-2 right-2 flex items-center gap-1 text-xs text-white bg-gray-600 dark:bg-gray-800 px-2 py-1 rounded hover:bg-gray-400 cursor-pointer transition";

      button.addEventListener("click", () => {
        navigator.clipboard.writeText(codeBlock.innerText).then(() => {
          button.innerHTML = this.checkIcon() + "<span>Copied!</span>";
          setTimeout(() => {
            button.innerHTML = this.copyIcon() + "<span>Copy</span>";
          }, 1500);
        });
      });

      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(button);
      wrapper.appendChild(pre);
    });
  }

  copyIcon() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" 
           fill="none" viewBox="0 0 24 24" 
           stroke-width="1.5" stroke="currentColor" 
           class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" 
              d="M8 16.5h8m-8-4.5h8m-8-4.5h8M6 4.5h12a2.25 
                 2.25 0 012.25 2.25v12a2.25 
                 2.25 0 01-2.25 2.25H6A2.25 
                 2.25 0 013.75 18.75v-12A2.25 
                 2.25 0 016 4.5z" />
      </svg>
    `;
  }

  checkIcon() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" 
           fill="none" viewBox="0 0 24 24" 
           stroke-width="1.5" stroke="currentColor" 
           class="w-4 h-4 text-green-500">
        <path stroke-linecap="round" stroke-linejoin="round" 
              d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    `;
  }
}
