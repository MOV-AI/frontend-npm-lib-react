/**
 *
 * @param {*} props: contains children which are Items
 */
export function ListItemsTree(props: any): React.JSX.Element;
export function ListItemsTreeWithSearch(props: any): React.JSX.Element;
export namespace ListItemsTreeWithSearch {
    namespace propTypes {
        const onSearch: PropTypes.Requireable<(...args: any[]) => any>;
    }
    namespace defaultProps {
        export function onSearch_1(input: any): void;
        export { onSearch_1 as onSearch };
    }
}
export function ListItemsTreeWithTitle(props: any): React.JSX.Element;
import React from "react";
import PropTypes from "prop-types";
