import zlib from "zlib";

namespace FileUtil {

    /**
     * 文字列を圧縮する
     * @param val 圧縮前の文字列
     * @returns 圧縮後の文字列
     */
    export const gZip = (val: string) => {
        // エンコード
        const content = encodeURIComponent(val);
        // 圧縮
        const result = zlib.gzipSync(content);
        // Buffer => base64変換
        const value = result.toString('base64');
        return value;
    }

    /**
     * 圧縮された文字列を複号する
     * @param val 圧縮された文字列
     * @returns 複号後の文字列
     */
    export const unZip = (val: string) => {
        // base64 => Bufferに変換
        const buffer = Buffer.from(val, 'base64')
        // 復号化
        const result = zlib.unzipSync(buffer)
        // デコード
        const str = decodeURIComponent(result.toString())
        return str;
    }

    /**
     * Date型の日時を文字列に変換する
     * @param date Date型の日時
     * @returns 文字列の日時
     */
    export const getStringFromDate = (date: Date) => {

        const year_str = date.getFullYear().toString();
        //月だけ+1すること
        const month_str = (1 + date.getMonth()).toString();
        const day_str = date.getDate().toString();
        const hour_str = date.getHours().toString();
        const minute_str = date.getMinutes().toString();
        const second_str = date.getSeconds().toString();

        let format_str = 'YYYY-MM-DD hh:mm:ss';
        format_str = format_str.replace(/YYYY/g, year_str);
        format_str = format_str.replace(/MM/g, month_str);
        format_str = format_str.replace(/DD/g, day_str);
        format_str = format_str.replace(/hh/g, hour_str);
        format_str = format_str.replace(/mm/g, minute_str);
        format_str = format_str.replace(/ss/g, second_str);

        return format_str;
    };
}

export default FileUtil;