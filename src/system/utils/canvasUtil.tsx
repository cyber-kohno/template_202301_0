namespace CanvasUtil {

    /**
     * Canvasに任意の描画をし、画像のURLを取得する
     * @param width 幅
     * @param height 高さ
     * @param draw 描画
     * @returns 画像のURL
     */
    export const createURL = (width: number, height: number, draw: (ctx: CanvasRenderingContext2D) => void) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        canvas.width = width;
        canvas.height = height;
        draw(ctx);
        return canvas.toDataURL();
    }
}

export default CanvasUtil;