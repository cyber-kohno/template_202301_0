import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Styles from "../../design/styles";

type ChannelPaneProps = {
    activeNo: number;
    tabElements: ChannelElements[];
    selectTabIndex?: Function;
}

type ChannelElements = {
    name: string;
    icon: JSX.Element;
    isEnable: boolean;
    cont: JSX.Element;
}

export const ChannelPane = (props: ChannelPaneProps) => {
    const [activeNo, setActiveNo] = useState(props.activeNo);

    // タブ押下時の処理
    const selectTabIndex = (index: number) => {
        if (props.selectTabIndex != undefined) {
            props.selectTabIndex(index);
        } else {
            setActiveNo(index);
        }
    };

    useEffect(() => {
        setActiveNo(props.activeNo);
    }, [props.activeNo]);

    return (
        <>
            <_LabelList>
                {
                    props.tabElements.map((tab, index) => {
                        return <ChannelLabel
                            key={index} name={tab.name} icon={tab.icon} isActive={index == activeNo} isEnable={tab.isEnable}
                            selectTab={() => selectTabIndex(index)}
                        />
                    })
                }
            </_LabelList>
            <_ContList>
                {
                    props.tabElements.map((tab, index) => {
                        return <ChannelContents key={index} cont={tab.cont} isActive={index === activeNo} />
                    })
                }
            </_ContList>
        </>
    );
}

const ChannelLabel = (props: {
    name: string;
    icon: JSX.Element;
    isEnable: boolean;
    isActive: boolean;
    selectTab: Function;
}) => {
    return (
        <_Item
            isEnable={props.isEnable}
            isActive={props.isActive}
            onClick={() => props.selectTab()}
        >
            <_Icon>{props.icon}</_Icon>
            <_Label>{props.name}</_Label>
        </_Item>
    );
}

const ChannelContents = (props: {
    isActive: boolean;
    cont: JSX.Element;
}) => {
    return (
        <_Contents isActive={props.isActive}>
            {props.cont}
        </_Contents>
    );
}

const _LabelList = styled.div`
    display: inline-block;
    width: 100px;
    margin-right: 5px;
    height: 100%;
    background-color: #b9b9b9;
    border: 1px solid #707070;
    box-sizing: border-box;
    border-radius: 10px 0 0 10px;
    vertical-align: top;
    box-shadow: 1px 2px 12px #aaaaaa;
`;
const _ContList = styled.div`
    display: inline-block;
    background-color: #b9b9b9;
    border: 1px solid #707070;
    box-sizing: border-box;
    width: calc(100% - 105px);
    height: 100%;
    border-radius: 0 6px 6px 0;
    box-shadow: 1px 2px 12px #aaaaaa;
`;

const _Contents = styled.div<{
    isActive: boolean;
}>`
    /* margin: 3px 0 0 3px;
    width: calc(100% - 6px);
    height: calc(100% - 6px); */
    width: 100%;
    height: 100%;
    /* background-color: #ece6e6; */
    ${props => !props.isActive ? css`display: none;` : css`display: inline-block;`}
`;

const _Item = styled.div<{
    isEnable: boolean;
    isActive: boolean;
}>`
    display: inline-block;
    width: 90px;
    height: 90px;
    margin: 5px 0 0 5px;
    border-radius: 10px;
    ${props => {
        if (props.isActive) {
            return css`
                background-color: #e4e3e1;
                border: 1px solid #949494
            `;
        } else {
            return css`
                background-color: #d1d1d1;
                opacity: 0.8;
            `;
        }
    }}
    ${props => props.isEnable ? '' : Styles.CSS_BUTTON_DISABLE}
    transition: background-color 500ms;
    & *{
        transition: color 150ms;
    }
    // アクティブじゃない時だけhover要素を付加
    ${props => props.isActive ? '' : css`
        &:hover {
            & *{
                transition: color 150ms;
                /* background-color: #e2d6d6; */
                text-shadow: 1px 2px 22px #f7f7f7ea;
                color: #a7a7a7;
            }
        }
    `}
`;

const IconHover = css`
    text-shadow: 1px 2px 22px #f7f7f7cf;
    color: #a3a3a3;
`;

const _Icon = styled.div`
    display: inline-block;
    width: 100%;
    height: 60px;
    /* background-color: #df828221; */
    font-size: 50px;
    color: #757575;
    text-align: center;
    padding-top: 5px;
    box-sizing: border-box;
`;

const _Label = styled.div`
    display: inline-block;
    width: 100%;
    height: 30px;
    /* background-color: #8482df20; */
    font-size: 20px;
    font-weight: 600;
    color: #757575;
    text-align: center;
`;