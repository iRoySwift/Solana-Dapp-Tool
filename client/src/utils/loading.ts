export default class Loading {
    content: any;
    constructor(content) {
        this.content = content;
        this.show();
    }
    show() {
        let html: any = `
        <div class="loading-info">
            <div class="loader">
            <span style="--i:1;"></span>
            <span style="--i:2;"></span>
            <span style="--i:3;"></span>
            <span style="--i:4;"></span>
            <span style="--i:5;"></span>
            <span style="--i:6;"></span>
            <span style="--i:7;"></span>
        </div>
        <div>${this.content}</div>
        <svg>
            <filter id="transform">
                <fegaussianblur in="SourceGraphic" stdDeviation="10">
                </fegaussianblur>
                <fecolormatrix values="1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 20 -10"></fecolormatrix>
            </filter>
        </svg>
        </div>
`;
        // $("body").append(html);
        this.appendHtml(html);
    }
    hide() {
        // $(".loading-info").remove();
        let loading = document.querySelector(".loading-info");
        loading?.remove();
    }
    appendHtml(html) {
        let divTemp = document.createElement("div");
        let nodes: any = null;
        let fragment: any = document.createDocumentFragment();
        divTemp.innerHTML = html;
        nodes = divTemp.childNodes;
        nodes.forEach(item => {
            fragment.appendChild(item.cloneNode(true));
        });
        document.body.appendChild(fragment);
        // 插入到最后 append
        // this.appendChild(fragment);
        // 在最前插入 prepend
        // this.insertBefore(fragment, this.firstChild);
        nodes = null;
        fragment = null;
    }
}
