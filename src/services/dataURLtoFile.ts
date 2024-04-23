export const dataURLtoFile = (dataurl:string, filename:string) => {
    
    const arr = dataurl.split(',')
        const mimeMatch = arr[0].match(/:(.*?);/);
        if(!mimeMatch)return
        const mime=mimeMatch[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
}