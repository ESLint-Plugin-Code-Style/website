import type { ChangeEventHandler, CSSProperties, Ref } from "react";

import { InputTypeEnum } from "@/enums";
import { joinClassesHandler } from "@/lib";

const inputBaseClass = "w-full bg-transparent outline-none";

export const Input = ({
    ariaLabel,
    className,
    inputRef,
    onChange,
    placeholder,
    style,
    type,
    value,
}: {
    ariaLabel?: string,
    className?: string,
    inputRef?: Ref<HTMLInputElement>,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    placeholder?: string,
    style?: CSSProperties,
    type?: InputTypeEnum,
    value?: string,
}) => (
    <input
        aria-label={ariaLabel}
        placeholder={placeholder}
        ref={inputRef}
        type={type ?? InputTypeEnum.TEXT}
        value={value}
        className={joinClassesHandler(
            inputBaseClass,
            className,
        )}
        style={{
            color: "var(--text-primary)",
            ...style,
        }}
        onChange={onChange}
    />
);
