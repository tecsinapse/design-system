import { useCallback, useState } from "react";

interface MaskValue {
    formatted?: string
    raw?: any
}

export interface Mask {
    converter?: (raw?: string) => MaskValue
    maskValue?: MaskValue
}

/**
 * TODO:
 * @param value 
 * @param mask 
 * @returns 
 */
const mergeMask = (value: string = "", mask: string) => {
    let chars = '' + value
    let formattedValue = ''

    for (let iMask = 0, iChars = 0; iMask < mask.length && iChars < chars.length; iMask++) {
      formattedValue += mask.charAt(iMask) === '9' ? chars.charAt(iChars++) : mask.charAt(iMask);
    }
    return formattedValue;
}

/**
 * TODO:
 * @param value 
 * @param mask 
 * @returns 
 */
const getMask = (value: string = "", mask: ((raw: any) => string) | string): string => {
    const onlyNumbers = value.replace(/\D/g,'')
    if (typeof mask === "function") {
        return mask(onlyNumbers)
    }
    return mask
}

/**
 * TODO:
 * @param mask
 * @returns 
 */
export const useMask = (mask: ((raw: any) => string) | string, defaultValue?: string): [Mask, (text: string) => void] => {

    const applyMask = useCallback((value: string = ""): MaskValue => {
        const onlyNumbers = value.replace(/\D/g,'')
        const selectedMask = getMask(onlyNumbers, mask)
        const formattedValue = mergeMask(onlyNumbers, selectedMask)

        return {
            raw: onlyNumbers, 
            formatted: formattedValue
        }

    }, [mask])

    const [ value, setValue ] = useState<Mask>({ 
        converter: applyMask, 
        maskValue: applyMask(defaultValue)
    })

    const handleChangeValue = useCallback((value: string) => {
        const { raw, formatted } = applyMask(value)
        setValue(oldValue => ({ ...oldValue, maskValue: { 
            raw, 
            formatted 
        }}))
    }, [applyMask, setValue, mask])

    return [ 
        value, 
        handleChangeValue
    ]
    
}