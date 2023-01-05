import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

type TabbedPaneProps = {
    activeNo: number;
    tabElements: TabElements[];
    selectTabIndex?: Function;
    tabRecordNum?: number;
}

type TabElements = {
    name: string;
    enable: boolean;
    cont: JSX.Element;
}

export const TabbedPane = (props: TabbedPaneProps) => {
    const [activeNo, setActiveNo] = useState(props.activeNo);

    // タブ押下時の処理
    const selectTabIndex = (index: number) => {
        if (props.selectTabIndex != undefined) {
            props.selectTabIndex(index);
        } else {
            setActiveNo(index);
        }
    };

    const tabRecordNum = props.tabRecordNum ?? 1;

    useEffect(() => {
        setActiveNo(props.activeNo);
    }, [props.activeNo]);

    return (
        <>
            <_LabelList tabRecordNum={tabRecordNum}>
                {/* {tabList} */}
                {
                    props.tabElements.map((tab, index) => {
                        return <TabLabel
                            key={index} name={tab.name} isActive={index == activeNo} isEnable={tab.enable}
                            selectTab={() => selectTabIndex(index)}
                        />
                    })
                }
            </_LabelList>
            <_ContList tabRecordNum={tabRecordNum}>
                {/* {contList} */}
                {
                    props.tabElements.map((tab, index) => {
                        return <TabContents key={index} cont={tab.cont} isActive={index === activeNo} />
                    })
                }
            </_ContList>
        </>
    );
}

const TabLabel = (props: {
    name: string;
    isActive: boolean;
    isEnable: boolean;
    selectTab: Function;
}) => {
    return (
        <_TabLabel
            isEnable={props.isEnable}
            isActive={props.isActive}
            onClick={() => props.selectTab()}>
            {props.name}
        </_TabLabel>
    );
}

const TabContents = (props: {
    isActive: boolean;
    cont: JSX.Element;
}) => {
    // return props.isActive ?
    //     <div className="tab-cont">{props.cont}</div>
    //     :
    //     <></>
    //     ;
    return (
        <_Contents isActive={props.isActive}>
            {props.cont}
        </_Contents>
    );
}

const _LabelList = styled.div<{
    tabRecordNum: number;
}>`
    display: inline-block;
    height: ${props => 35 * props.tabRecordNum}px;
    text-align: left;
    /* background-color: #ac3b3b; */
    width: 100%;
`;
const _ContList = styled.div<{
    tabRecordNum: number;
}>`
    display: block;
    background-color: #999999;
    height: calc(100% - ${props => props.tabRecordNum * 35}px);
    border-radius: 0 6px 6px 6px;
    box-shadow: 0 2px 0 0 #000b3a48;
    text-align: left;
`;

const _Contents = styled.div<{
    isActive: boolean;
}>`
    margin: 3px 0 0 3px;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    ${props => !props.isActive ? css`display: none;` : css`display: inline-block;`}
`;

const _TabLabel = styled.div<{
    isEnable: boolean;
    isActive: boolean;
}>`
    display: inline-block;
    /* width: 100px; */
    padding: 0 10px;
    
    ${props => {
        if (props.isActive) {
            return css`
                color: #ebebeb;
                padding: 0 35px;
                background-color: #999999;
                height: 35px;
                font-size: 24px;
                border-radius: 3px 15px 0 0;
                text-shadow: 1px 2px 3px #00000065;
            `;
        } else {
            return css`
                height: 100%;
                color: #555;
                /* background-color: #90909b; */
                background: linear-gradient(to bottom, #999999, #7a7a7a);
                height: 30px;
                font-size: 18px;
                margin-top: 5px;
                border-radius: 3px 10px 0 0;
                ${props.isEnable ? '' : css`
                    pointer-events: none;
                    opacity: 0.7;
                `}
            `;
        }
    }}
    /* opacity: 0.7; */
    user-select: none;
    margin-right: 6px;
    font-weight: 600;
    box-sizing: border-box;
    line-height: 30px;
    vertical-align: bottom;
    transition: padding 100ms;
`;