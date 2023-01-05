import { useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";

namespace TreeUtil {

    export type ElementNode = {
        // jsx: JSX.Element;
        isOpen: boolean;
        // index: number;
        depth: number;
        data: any;
        children: ElementNode[];
        parent: null | ElementNode;
    }

    export type DataNode = {
        data: any;
        children: DataNode[];
    }

    export const createNode = (data: any, parent: ElementNode): ElementNode => {
        // parent.isOpen = true;
        return {
            data, parent, depth: parent.depth + 1,
            isOpen: false,
            children: [],
        };
    }

    export const getChildIndex = (node: TreeUtil.ElementNode) => {
        const parentNode = node.parent;
        if (parentNode != null) {
            for (let i = 0; i < parentNode.children.length; i++) {
                if (node == parentNode.children[i]) return i;
            }
        }
        return -1;
    }

    export const Frame = (props: {
        rootDataNode: DataNode;
        clickEvent: (node: ElementNode) => void;
        getLabelJsx: (node: ElementNode) => JSX.Element;
        invalidate: any;
        isDisable?: boolean;
        focusNode?: ElementNode | null;
    }) => {
        const isDisable = props.isDisable ?? false;
        const focusNode = props.focusNode ?? null;

        /**
         * データを元に再帰的に以下のツリーを構成する。
         * @returns ツリー
         */
        const buildElementNodeFromData = () => {
            const build = (depth: number, dataNode: DataNode, parent: null | ElementNode): ElementNode => {
                const node: ElementNode = {
                    data: dataNode.data,
                    depth: depth,
                    // index: count,
                    isOpen: false,
                    children: [],
                    parent
                };
                node.children = (() => {
                    return dataNode.children.map(child => {
                        return build(depth + 1, child, node);
                    });
                })();
                return node;
            }
            return build(0, props.rootDataNode, null);
        }
        const [rootElementNode, setRootElementNode] = useState<ElementNode>(buildElementNodeFromData());

        useEffect(() => {
            setRootElementNode(buildElementNodeFromData());
        }, [props.rootDataNode]);

        useEffect(() => {
            if (focusNode != null && focusNode.parent != null) {
                focusNode.parent.isOpen = true;
            }
        }, [focusNode]);

        const jsxList = useMemo(() => {
            // console.log(rootElementNode);
            const list: JSX.Element[] = [];
            const buildJsxRecords = (element: ElementNode, spaceList: boolean[]) => {

                const getSpaces = () => {
                    return spaceList.map((space, i) => {
                        const lines: JSX.Element[] = [];
                        if (spaceList.length - 1 === i || space) lines.push(space ? <_LineFull key={lines.length} /> : <_LineTop key={lines.length} />);
                        if (spaceList.length - 1 === i) lines.push(<_LineRight key={lines.length} />);
                        return <_Space key={i}>{lines}</_Space>;
                    });
                }

                const isRelationNode = () => {
                    let result = false;
                    let tempNode = focusNode;
                    // 親判定
                    while (tempNode != null) {
                        if (element.parent == null || element == tempNode) {
                            result = true;
                            break;
                        }
                        tempNode = tempNode.parent;
                    }
                    // 兄弟判定
                    if (result === false && focusNode != null && focusNode.parent != null) {
                        result = focusNode.parent.children.find(node => node == element) != undefined;
                    }
                    return result;
                }
                const isCurrent = element.data == focusNode?.data;
                list.push(
                    <_Record
                        key={list.length}
                        isActive={isCurrent}
                        isRelation={!isDisable && isRelationNode()}
                        isDisable={isCurrent && isDisable}
                    >
                        {getSpaces()}
                        {element.children.length === 0 ? <></> : <_Branch
                            onClick={() => {
                                element.isOpen = !element.isOpen;
                                setRootElementNode({ ...rootElementNode });
                                // alert(element.isOpen);
                            }}
                        >{element.isOpen ? '-' : '+'}</_Branch>}
                        <_Jsx
                            onClick={() => {
                                props.clickEvent(element);
                                setRootElementNode({ ...rootElementNode });
                            }}
                            onDoubleClick={() => {
                                element.isOpen = !element.isOpen;
                                setRootElementNode({ ...rootElementNode });
                            }}
                        >
                            {props.getLabelJsx(element)}
                        </_Jsx>
                    </_Record>
                );
                if (element.isOpen) {
                    element.children.forEach((child, i) => {
                        buildJsxRecords(child, spaceList.slice().concat(element.children.length - 1 !== i));
                    });
                }
            }
            buildJsxRecords(rootElementNode, []);
            // rootJsxNode.forEach((el) => {
            //     addElement(el, []);
            // });
            return list;
        }, [rootElementNode, props.invalidate, isDisable]);

        return (
            <_Wrap isDisable={isDisable}>
                {jsxList}
            </_Wrap>
        );
    }
}

export default TreeUtil;

const _Wrap = styled.div<{
    isDisable: boolean;
}>`
    display: inline-block;
    position: relative;
    background-color: #374a54;
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    box-sizing: border-box;
    border: solid 1px #000;
    margin: 5px;
    overflow: auto;
    ${props => !props.isDisable ? '' : css`
        pointer-events: none;
        background-color: #1f3642;
    `}
`;

const _Record = styled.div<{
    isActive: boolean;
    isRelation: boolean;
    isDisable: boolean;
}>`
    display: block;
    /* position: relative; */
    ${props => !props.isDisable ? '' : css`
        background-color: #459cff46;
    `}
    opacity: 0.3;
    ${props => !props.isRelation ? '' : css`
        background-color: #ffffff28;
        opacity: 1;
    `}
    ${props => !props.isActive ? '' : css`
        background-color: #b4d9dd83;
        opacity: 1;
    `}
    /* width: calc(100% - 10px); */
    height: 40px;
    box-sizing: border-box;
    white-space: nowrap;
    /* border: solid 1px #000;
    margin: 5px; */
    & *{
        vertical-align: top;
    }
    &:hover {
        opacity: 1;
    }
`;

const _Space = styled.div`
    display: inline-block;
    position: relative;
    /* background-color: #b6d5be; */
    width: 40px;
    height: 100%;
    box-sizing: border-box;
    /* border: solid 1px #000; */
`;
const _LineTop = styled.div`
    display: inline-block;
    position: relative;
    background-color: #b60000;
    width: 4px;
    height: 22px;
    box-sizing: border-box;
    margin: 0 0 0 20px;
`;
const _LineFull = styled.div`
    display: inline-block;
    position: relative;
    background-color: #b60000;
    width: 4px;
    height: 100%;
    box-sizing: border-box;
    margin: 0 0 0 20px;
`;
const _LineRight = styled.div`
    display: inline-block;
    position: relative;
    background-color: #b60000;
    width: 16px;
    height: 4px;
    box-sizing: border-box;
    margin: 18px 0 0 0;
`;

const _Branch = styled.div`
    display: inline-block;
    /* position: relative; */
    background-color: #d1d1d1;
    width: 30px;
    height: calc(100% - 10px);
    border: solid 1px #000;
    margin: 5px 0 0 3px;
    box-sizing: border-box;
    font-size: 30px;
    /* font-weight: 600; */
    color: #6d1717;
    line-height: 20px;
    padding-left: 3px;
`;
const _Jsx = styled.div`
    display: inline-block;
    position: relative;
    /* background-color: #ffffff3c; */
    min-width: 100px;
    height: 100%;
    margin: 0 0  0 3px;
    box-sizing: border-box;
`;
