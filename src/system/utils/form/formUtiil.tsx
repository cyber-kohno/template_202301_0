import styled, { css } from "styled-components";
import Styles, { _CSS_LABEL_MIDIUM } from "../../base/design/styles";
import ValidateUtil from "./validateUtil";
import { useEffect } from "react";

namespace FormUtil {

    export type CheckableValue = {
        value: string;
        errors: ValidateUtil.ErrorType[];
    }

    export const isCompleteCheck = (checkables: CheckableValue[]) => {
        let result = true;
        checkables.forEach(checkable => {
            if (checkable.errors.length > 0) {
                result = false;
                return 1;
            }
        });
        return result;
    }

    export const InputTextFormBak = (props: {
        titleLabel?: string;
        checkable: CheckableValue;
        setCheckable: (value: CheckableValue) => void;
        isEnable?: boolean;
        placeholder?: string;
        isCenter?: boolean;
        width?: number;
        isPassword?: boolean;
        validates?: ValidateUtil.Validate[];
        dependency?: CheckableValue[];
        marginTop?: number;
        isReadOnly?: boolean;
        marginBottom?: number;
    }) => {
        const type = props.isPassword ?? false ? 'password' : 'text';

        const validaters = props.validates ?? [];
        const errors = props.checkable.errors;
        const dependency = (props.dependency ?? []).map(dep => dep.value);

        const getErrors = (value: string) => {
            const errors: ValidateUtil.ErrorType[] = [];
            validaters.forEach(validater => {
                if (!validater.checker(value)) {
                    errors.push(validater.errorType);
                }
            });
            return errors;
        }
        useEffect(() => {
            props.checkable.errors = getErrors(props.checkable.value);
            props.setCheckable({ ...props.checkable });
        }, dependency);
        return (
            <_Record
                isEnable={props.isEnable ?? true}
                isVisible={true}
                textAlign={(props.isCenter ?? false) ? 'center' : 'left'}
                marginTop={props.marginTop ?? 0}
            >
                {props.titleLabel == undefined ? <></> : <_ItemnLabel>{props.titleLabel}</_ItemnLabel>}
                <_ItemnInputBak
                    type={type}
                    value={props.checkable.value}
                    hasTitle={props.titleLabel != undefined}
                    width={props.width}
                    isCenter={props.isCenter ?? false}
                    placeholder={props.placeholder}
                    onChange={(e) => {
                        const value = e.target.value;
                        props.checkable.value = value;
                        props.checkable.errors = getErrors(value);
                        props.setCheckable({ ...props.checkable });
                    }}
                    errorType={errors.length === 0 ? undefined : errors[0]}
                    readOnly={props.isReadOnly}
                />
            </_Record>
        );
    }


    export const Record = (props: {
        isEnable?: boolean;
        textAlign?: 'left' | 'center' | 'right';
        marginTop?: number;
        jsx: JSX.Element;
    }) => {
        return (
            <_Record
                isEnable={props.isEnable ?? true}
                isVisible={true}
                textAlign={props.textAlign ?? 'left'}
                marginTop={props.marginTop ?? 0}
            >
                {props.jsx}
            </_Record>
        );
    }

    export const FormRecord = (props: {
        titleLabel?: string;
        labelWidth?: number;
        isEnable?: boolean;
        isVisible?: boolean;
        textAlign?: 'left' | 'center' | 'right';
        marginTop?: number;
        jsx: JSX.Element;
    }) => {
        return (
            <_Record
                isEnable={props.isEnable ?? true}
                isVisible={props.isVisible ?? true}
                textAlign={props.textAlign ?? 'left'}
                marginTop={props.marginTop ?? 0}
            >
                {props.titleLabel == undefined ? <></> : <_ItemnLabel labelWidth={props.labelWidth}>{props.titleLabel}</_ItemnLabel>}
                {props.jsx}
            </_Record>
        );
    }

    export const TextField = (props: {
        checkable: CheckableValue;
        setCheckable: (value: CheckableValue) => void;
        isEnable?: boolean;
        placeholder?: string;
        width?: number;
        isPassword?: boolean;
        validates?: ValidateUtil.Validate[];
        dependency?: CheckableValue[];
        isReadOnly?: boolean;
        isNumber?: boolean;
        marginLeft?: number;
    }) => {
        let type = props.isPassword ?? false ? 'password' : 'text';
        if (props.isNumber ?? false) {
            type = 'number';
        }

        const validaters = props.validates ?? [];
        const errors = props.checkable.errors;
        const dependency = (props.dependency ?? []).map(dep => dep.value);

        const getErrors = (value: string) => {
            const errors: ValidateUtil.ErrorType[] = [];
            validaters.forEach(validater => {
                if (!validater.checker(value)) {
                    errors.push(validater.errorType);
                }
            });
            return errors;
        }
        useEffect(() => {
            props.checkable.errors = getErrors(props.checkable.value);
            props.setCheckable({ ...props.checkable });
        }, dependency.concat(props.checkable.value));

        let value = props.checkable.value;
        // if (type === 'number' && value === '') value = '0';
        return (
            <_ItemnInput
                type={type}
                value={value}
                width={props.width ?? 100}
                placeholder={props.placeholder}
                onChange={(e) => {
                    let value = e.target.value;
                    // if (type === 'number' && value === '') value = '0';
                    props.checkable.value = type !== 'number' ? value : Number(value).toString();
                    // props.checkable.errors = getErrors(value);
                    props.setCheckable({ ...props.checkable });
                }}
                errorType={errors.length === 0 ? undefined : errors[0]}
                readOnly={props.isReadOnly}
                marginLeft={props.marginLeft}
            />
        );
    }

    export type ComboboxItemProps = { value: string, labelText: string, isDisabled?: boolean };
    export const Combobox = (props: {
        list: ComboboxItemProps[];
        headBlank?: boolean;
        checkable: CheckableValue;
        setCheckable: (value: CheckableValue) => void;
        isEnabled?: boolean;
        placeholder?: string;
        width?: number;
        validates?: ValidateUtil.Validate[];
        dependency?: CheckableValue[];
        isReadOnly?: boolean;
        marginLeft?: number;
    }) => {
        const validaters = props.validates ?? [];
        const errors = props.checkable.errors;
        const dependency = (props.dependency ?? []).map(dep => dep.value);
        const headBlank = props.headBlank ?? false;
        const list = props.list.slice();
        if (headBlank) list.unshift({ value: '', labelText: '' });

        const getErrors = (value: string) => {
            const errors: ValidateUtil.ErrorType[] = [];
            validaters.forEach(validater => {
                if (!validater.checker(value)) {
                    errors.push(validater.errorType);
                }
            });
            return errors;
        }

        useEffect(() => {
            // console.log('value: ' + props.checkable.value);
            props.checkable.errors = getErrors(props.checkable.value);
            props.setCheckable({ ...props.checkable });
        }, dependency.concat(props.checkable.value));

        return (
            <_ItemCombobox
                value={props.checkable.value}
                width={props.width ?? 100}
                placeholder={props.placeholder}
                onChange={(e) => {
                    const value = e.target.value;
                    props.checkable.value = value;
                    // props.checkable.errors = getErrors(value);
                    props.setCheckable({ ...props.checkable });

                }}
                errorType={errors.length === 0 ? undefined : errors[0]}
                readOnly={props.isReadOnly}
                marginLeft={props.marginLeft}
            >{list.map((item, i) => {
                return (
                    <_Option key={i}
                        value={item.value}
                        disabled={item.isDisabled ?? false}
                        isDisabled={item.isDisabled ?? false}
                    >{item.labelText}</_Option>
                );
            })}</_ItemCombobox>
        );
    }

    export type ButtonProps = {
        label: string;
        isEnable?: boolean;
        width?: number;
        callback: () => void;
    }

    export const ButtonRecord = (props: {
        buttons: ButtonProps[],
        isCenter?: boolean;
        marginTop?: number;
        marginBottom?: number;
    }) => {
        return (
            <_Record
                isEnable={true}
                isVisible={true}
                textAlign={(props.isCenter ?? false) ? 'center' : 'right'}
                marginTop={props.marginTop ?? 0}
            >
                {props.buttons.map((button, i) => {
                    return (
                        <_Button
                            key={i}
                            isCenter={props.isCenter ?? false}
                            isEnable={button.isEnable ?? true}
                            width={button.width}
                            onClick={button.callback}
                        >{button.label}</_Button>
                    );
                })}
            </_Record>
        );
    }

    export const Message = (props: {
        message: string,
        isCenter?: boolean;
        marginTop?: number;
        marginBottom?: number;
    }) => {
        return (
            <_Record
                isEnable={true}
                isVisible={true}
                textAlign={(props.isCenter ?? false) ? 'center' : 'left'}
                marginTop={props.marginTop ?? 0}
            >
                <_Message
                    isCenter={props.isCenter ?? false}
                >{props.message}</_Message>
            </_Record>
        );
    }

    export const MessageLink = (props: {
        message: string,
        isCenter?: boolean;
        clickAction: () => void;
        marginTop?: number;
        marginBottom?: number;
    }) => {
        return (
            <_Record
                isEnable={true}
                isVisible={true}
                textAlign={(props.isCenter ?? false) ? 'center' : 'left'}
                marginTop={props.marginTop ?? 0}
            >
                <_Message
                    isLink={true}
                    onClick={props.clickAction}
                    isCenter={props.isCenter ?? false}
                >{props.message}</_Message>
            </_Record>
        );
    }

    export const BorderPanel = (props: {
        title: string;
        isEnable?: boolean;
        innerJsx: JSX.Element;
    }) => {
        // const title = props.title ?? 'title pl';
        return (<>
            <_BorderText>{props.title}</_BorderText>
            <_BorderPanel isEnable={props.isEnable ?? true}>{props.innerJsx}</_BorderPanel>
        </>);
    }

    export const InfoFrame = (props: {
        height?: number;
        textRecords: string[];
    }) => {
        const height = props.height ?? 70;
        const color = '#1a9900';
        return (<>
            <_InfoDiv height={height} color={color}>
                {props.textRecords.map((text, i) => {
                    return <span key={i}>{text}<br /></span>;
                })}
            </_InfoDiv>
        </>);
    };

    export const Switch = (props: {
        label: string;
        isUse: boolean;
        isEnable?: boolean;
        width?: number;
        isRelation?: boolean;
        callback: () => void;
    }) => {
        const isRelation = props.isRelation ?? false;
        const callback = isRelation && props.isUse ? () => { } : props.callback;
        return (
            <_Switch
                isRelation={isRelation}
                isUse={props.isUse}
                isEnable={props.isEnable ?? true}
                width={props.width}
                onClick={callback}
            >{props.label}</_Switch>
        );
    }
}

export default FormUtil;


const _Record = styled.div<{
    isEnable: boolean;
    isVisible: boolean;
    textAlign: 'left' | 'center' | 'right';
    marginTop: number;
}>`
    display: inline-block;
    ${props => props.isVisible ? '' : css`
        display: none;
    `}
    width: 100%;
    height: 40px;
    margin-top: ${props => props.marginTop}px;
    /* background-color: #b3b4c4; */
    /* border: 1px solid #000; */
    ${props => props.isEnable ? '' : Styles.CSS_BUTTON_DISABLE}
    text-align: ${props => props.textAlign};
`;

const _ItemnLabel = styled.div<{
    labelWidth?: number;
}>`
    display: inline-block;
    height: calc(100% - 4px);
    width: ${props => props.labelWidth ?? 140}px;
    ${Styles.CSS_LABEL_MIDIUM}
    color: #585858;
    border: solid 1px #7a7a7abf;
    box-sizing: border-box;
    /* background-color: #85a2c5; */
    background: linear-gradient(to bottom, #c3c3c3fc, #d8d8d8, #c3c3c3fc);
    border-radius: 4px;
    text-align: center;
    vertical-align: top;
    margin: 5px 4px 0 4px;
`;

const _ItemnInputBak = styled.input<{
    readOnly?: boolean;
    isCenter: boolean;
    hasTitle: boolean;
    width?: number;
    errorType?: ValidateUtil.ErrorType;
}>`
    display: inline-block;
    height: calc(100% - 4px);
    ${props => !props.hasTitle ? css`
    ` : css`
        width: calc(100% - 152px);
    `}
    ${props => props.width == undefined ? '' : css`
        width: ${props.width}px;
    `}
    margin-top: 2px;
    font-size: 24px;
    line-height: 32px;
    /* font-weight: 600; */
    color: #3d3d3d;
    border: solid 1px #959595;
    border-radius: 4px;
    padding: 0 5px;
    box-sizing: border-box;
    background-color: ${props => {
        if (props.errorType == undefined) return '#ececec';
        else {
            switch (props.errorType) {
                case 'required': return '#dbd7b3';
                case 'length': return '#dbb3b3';
                case 'value': return '#b3b3db';
                case 'relation': return '#b3dbb3';
            }
        }
    }};
    text-align: left;
    vertical-align: top;
    user-select: text;
    /* ${props => !props.isCenter ? css`
        margin-left: 4px;
    ` : css``
    } */
    ${props => !props.readOnly ? '' : css`
        color: #020075;
        /* border: none; */
        outline: none;
        background-color: transparent;
    `}
    ::placeholder {
        color: #00000050;
        font-style: italic;
    }
`;

const _ItemnInput = styled.input<{
    readOnly?: boolean;
    width?: number;
    errorType?: ValidateUtil.ErrorType;
    marginLeft?: number;
}>`
    display: inline-block;
    height: calc(100% - 4px);
    width: ${props => props.width}px;
    margin-top: 2px;
    margin-left: ${props => props.marginLeft ?? 0}px;
    font-size: 24px;
    line-height: 32px;
    /* font-weight: 600; */
    color: #3d3d3d;
    border: solid 1px #959595;
    border-radius: 4px;
    padding: 0 5px;
    box-sizing: border-box;
    background-color: ${props => {
        if (props.errorType == undefined) return '#ececec';
        else {
            switch (props.errorType) {
                case 'required': return '#dbd7b3';
                case 'length': return '#dbb3b3';
                case 'value': return '#b3b3db';
                case 'relation': return '#b3dbb3';
            }
        }
    }};
    text-align: left;
    vertical-align: top;
    user-select: text;
    ${props => !props.readOnly ? '' : css`
        color: #020075;
        /* border: none; */
        outline: none;
        background-color: transparent;
    `}
    ::placeholder {
        color: #00000050;
        font-style: italic;
    }
`;

const _ItemCombobox = styled.select<{
    readOnly?: boolean;
    width?: number;
    errorType?: ValidateUtil.ErrorType;
    marginLeft?: number;
}>`
    display: inline-block;
    height: calc(100% - 4px);
    width: ${props => props.width}px;
    margin-top: 2px;
    margin-left: ${props => props.marginLeft ?? 0}px;
    font-size: 24px;
    line-height: 32px;
    /* font-weight: 600; */
    color: #3d3d3d;
    border: solid 1px #959595;
    border-radius: 4px;
    padding: 0 5px;
    box-sizing: border-box;
    background-color: ${props => {
        if (props.errorType == undefined) return '#ececec';
        else {
            switch (props.errorType) {
                case 'required': return '#dbd7b3';
                case 'length': return '#dbb3b3';
                case 'value': return '#b3b3db';
                case 'relation': return '#b3dbb3';
            }
        }
    }};
    text-align: left;
    vertical-align: top;
    user-select: text;
    ${props => !props.readOnly ? '' : css`
        color: #020075;
        /* border: none; */
        outline: none;
        background-color: transparent;
        pointer-events: none;
    `}
    ::placeholder {
        color: #00000050;
        font-style: italic;
    }
`;

const _Option = styled.option<{
    isDisabled: boolean;
}>`
    ${props => !props.isDisabled ? '' : css`
        color: #0000004b;
    `}
`;

const _Message = styled.div<{
    isLink?: boolean;
    isCenter: boolean;
}>`
    display: inline-block;
    height: calc(100% - 4px);
    margin-top: 2px;
    font-size: ${Styles.FONT_MIDIUM}px;
    line-height: 32px;
    /* font-weight: 600; */
    color: #002c52;
    border-radius: 4px;
    padding: 0 5px;
    box-sizing: border-box;
    /* background-color: #d37878; */
    text-align: left;
    vertical-align: top;
    user-select: text;
    ${props => !props.isCenter ? css`
        margin-left: 4px;
    ` : css``
    }
    ${props => !props.isLink ? '' : css`
        color: #0459a3;
        user-select: none;
        text-decoration: underline;
        &:hover {
            color: #68a4d8;
        }
    `}
`;

const _ButtonsDiv = styled.div`
    display: inline-block;
    width: 100%;
    height: 40px;
    /* background-color: #888888; */
    box-sizing: border-box;
    text-align: left;
    white-space: nowrap;
`;

const _Button = styled.div<{
    isEnable: boolean;
    isCenter: boolean;
    width?: number;
}>`
    ${Styles.CSS_LABEL_MIDIUM}
    ${props => props.width == undefined ? css`
        padding: 0 40px;
    ` : css`
        width: ${props.width}px;
    `}
    /* line-height: 25px; */
    box-sizing: border-box;
    /* background-color: #a8a8a8; */
    background: linear-gradient(to bottom, #cdcdcd, #ebebeb, #cdcdcd);
    border: 1px solid #747474;
    color: #515151;
    border-radius: 4px;
    ${props => !props.isCenter ? css`
        margin-left: 4px;
    ` : css``
    }
    margin: 5px 0 0 4px;
    ${props => props.isEnable ? '' : Styles.CSS_BUTTON_DISABLE}
    &:hover {
        /* background-color: #98bfc2; */
        background: linear-gradient(to bottom, #989898, #b4b4b4, #989898);
    }
`;

const _Switch = styled.div<{
    isUse: boolean;
    isEnable: boolean;
    width?: number;
    isRelation: boolean;
}>`
    ${Styles.CSS_LABEL_MIDIUM}
    ${props => props.width == undefined ? css`
        padding: 0 40px;
    ` : css`
        width: ${props.width}px;
    `}
    /* line-height: 25px; */
    box-sizing: border-box;
    background-color: #a8a8a8;
    color: #515151;
    border: 1px solid #747474;
    ${props => !props.isRelation ? css<{ isUse: boolean }>`
        background-color: ${props => !props.isUse ? '#e7e7e779' : '#e4f67e'};
    ` : css<{ isUse: boolean }>`
        background-color: ${props => !props.isUse ? '#ddc1d979' : '#d898b3'};
        color: ${props => !props.isUse ? '#515151' : '#9c2626'};
    `}
    border-radius: 4px;
    margin: 5px 0 0 4px;
    ${props => props.isEnable ? '' : Styles.CSS_BUTTON_DISABLE}
    &:hover {
        ${props => !props.isRelation ? css<{ isUse: boolean }>`
            background-color: ${props => !props.isUse ? '#edefb286' : '#b5be7f'};
        ` : css<{ isUse: boolean }>`
            background-color: ${props => !props.isUse ? '#d3a1cb79' : '#d898b3'};
            color: ${props => !props.isUse ? '#515151' : '#9c2626'};
        `}
    }
`;

const _BorderText = styled.div<{
}>`
    ${Styles.CSS_LABEL_SMALL}
    color: #990000;
    /* background-color: #0a0a0a40; */
    font-style: italic;
    margin: 4px 0 0 8px;
`;
const _BorderPanel = styled.div<{
    isEnable: boolean;
}>`
    display: inline-block;
    margin: 0 0 0 6px;
    padding: 4px;
    width: calc(100% - 12px);
    background-color: #dcddce;
    border: 1px solid #000;
    box-sizing: border-box;
    border-radius: 4px;
    text-align: left;
    ${props => props.isEnable ? '' : Styles.CSS_BUTTON_DISABLE}
`;

const _InfoDiv = styled.div<{
    height: number;
    color: string;
}>`
    margin: 4px 0 0 0;
    display: inline-block;
    background-color: #e7e5e561;
    border: solid 1px #949494;
    width: 100%;
    height: ${props => props.height}px;
    padding: 2px;
    box-sizing: border-box;
    text-align: left;
    font-size: ${Styles.FONT_SMALL}px;
    color: ${props => props.color};
    overflow-y: auto;
`;