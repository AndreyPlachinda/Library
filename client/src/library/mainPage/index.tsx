import React from "react";
import {RootState} from "../../redux";
import {getBookList} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import { ListType } from "../types";
import {Table} from "antd";
import * as s from '../styled';
import {columns} from "./columns";

const tableStyles: React.CSSProperties = { width: "100%" };
export const MainInfoComponent: React.FC = () => {
    const dispatch = useDispatch(); // получение функции store.dispatch в компоненте
    const bookList = useSelector<RootState, ListType[]>(state => state.library.list);

    React.useEffect(() => {
        dispatch(getBookList.started());
    }, [dispatch]);

    return (
        <s.WrapperComponentStyled>
            <s.TitleStyled>Онлайн библиотека</s.TitleStyled>
            <Table
                style={tableStyles}
                dataSource={bookList}
                columns={columns}
            />
        </s.WrapperComponentStyled>
    );
};
