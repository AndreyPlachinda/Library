import React from "react";
import {Button, Tooltip} from "antd";
import {ListType} from "../types";
import {ActionsBlockButton} from "../styled";
import {MinusCircleFilled} from "@ant-design/icons/lib";
import {deleteBook, userClickedOnTheDetailsButton} from "../redux/actions";
import {useDispatch} from "react-redux";
import {DetailsInfoComponent} from "../bookDetails";

export const ButtonInfo: React.FC<{ item: ListType }> = ({ item }) => {
    const dispatch= useDispatch();
    const onClickRemoveButton = React.useCallback(
        () => dispatch(deleteBook(item.id)),
        [dispatch, item.id]
    );
    const [visible, setVisible] = React.useState(false);

    const onClickDetailButton = React.useCallback(
        () => {
            setVisible(true);
            localStorage.setItem('bookId', String(item.id));
            dispatch(userClickedOnTheDetailsButton(item.id));
        },
        [dispatch, item.id]
    );

    const changeVisible = React.useCallback(() => setVisible(false), []);

    return (
        <>
            <ActionsBlockButton>
                <Button type='primary' onClick={onClickDetailButton}>Детальная информация</Button>
                <Button type='primary' style={{ marginLeft: '16px' }} onClick={onClickRemoveButton}>
                    Удалить книгу
                </Button>
            </ActionsBlockButton>
            <DetailsInfoComponent visible={visible} changeVisible={changeVisible} />
            </>
    )
};