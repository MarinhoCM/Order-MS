export class StringUtil {
    static captalize(word: string) {
        return word.charAt(0).toLocaleUpperCase() + word.slice(1)
    }
}