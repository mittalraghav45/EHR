import md5 from "md5";

export function encrypt(plaintext) {
    return md5(plaintext)
}
