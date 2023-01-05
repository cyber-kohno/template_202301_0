
/**
 * 入力チェックを行うユーティリティ。
 */
namespace ValidateUtil {

    export type ErrorType = 'required' | 'length' | 'value' | 'relation';

    export type Validate = {
        checker: (value: string) => boolean;
        errorType: ErrorType;
        message?: string;
    }

    /**
     * 必須チェック
     * @param str 検証する文字列
     * @returns 判定結果
     */
    export const checkRequired = (str: string) => {
        return str.length > 0;
    }

    /**
     * 文字列の長さチェック
     * @param str 検証する文字列
     * @param min 最小値
     * @param max 最大値
     * @returns 判定結果
     */
    export const checkStringLength = (str: string, min: number, max: number) => {
        return str.length === 0 || (str.length >= min && str.length <= max);
    }

    /**
     * 半角英数時チェック
     * @param str 検証する文字列
     * @returns 判定結果
     */
    export const checkAsciiChars = (str: string) => {
        const list = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return checkIncludesChars(str, list);
    }

    /**
     * 指定の文字列で構成されているかチェック
     * @param str 検証する文字列
     * @param list 入力を許す対象文字列
     * @returns 判定結果
     */
    export const checkIncludesChars = (str: string, list: string) => {
        for (let i = 0; i < str.length; i++) {
            const ch = str.charAt(i);
            if (list.indexOf(ch) === -1) return false;
        }
        return true;
    }

    /**
     * 指定の文字列が数値に変換できるかチェック
     * @param str 検証する文字列
     * @returns 判定結果
     */
    export const checkNumber = (str: string) => {
        return !isNaN(Number(str));
    }

    /**
     * 
     * @param conditions 
     * @returns 
     */
    export const checkAll = (conditions: boolean[]): boolean => {
        let result = true;
        for (let i = 0; i < conditions.length; i++) {
            if (!conditions[i]) {
                result = false;
                break;
            }
        }
        return result;
    }
}
export default ValidateUtil;
