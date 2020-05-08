import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux";
import {ListType} from "../types";
import * as s from '../styled';
import {Button, Descriptions, Drawer} from "antd";
import {cancelChanges, getBookInfoInitialize, saveChanges} from "../redux/actions";
import {ItemComponent} from "./descriptionsItem";
import {StatusComponent} from "./statusComponent";

const buttonStyles: React.CSSProperties = { marginLeft: '16px' };

export const DetailsInfoComponent: React.FC<{ visible: boolean; changeVisible: () => void }> = (
    { visible, changeVisible }
    ) => {
    const dispatch = useDispatch();

    const initialize = useSelector<RootState, boolean>(
        state => state.library.initialize
    );

    React.useEffect(() => {
        if (initialize)
            dispatch(getBookInfoInitialize.started(Number(localStorage.getItem('bookId'))))
    }, [dispatch, initialize]);

    const currentBookInfo = useSelector<RootState, ListType | any>(
        state => state.library.currentBookInfo || {}
    );
    const isSaving = useSelector<RootState, boolean>(
        state => state.library.isSaving
    );
    const {
        yearOfPublishing,
        author,
        name,
    } = currentBookInfo;

    const [inputTitle, setInputTitle] = React.useState(name);
    const [inputAuthor, setInputAuthor] = React.useState(author);
    const [inputYearOfPublishing, setInputYearOfPublishing] = React.useState(yearOfPublishing);

    const onClick = React.useCallback(
        () => {
            const bookInfo: ListType = {
                ...currentBookInfo,
                name: inputTitle,
                author: inputAuthor,
                yearOfPublishing: inputYearOfPublishing
            };
            dispatch(saveChanges.started(bookInfo));
            changeVisible();
        },
        [changeVisible, currentBookInfo, dispatch, inputAuthor, inputTitle, inputYearOfPublishing]
    );
    
    React.useEffect(() => {
        setInputTitle(name);
    }, [name]);

    React.useEffect(() => {
        setInputAuthor(author);
    }, [author]);

    React.useEffect(() => {
        setInputYearOfPublishing(yearOfPublishing);
    }, [yearOfPublishing]);

    const onChangeInputTitle = React.useCallback(e => {
        setInputTitle(e.target.value);
    }, []);

    const onChangeInputAuthor = React.useCallback(e => {
        setInputAuthor(e.target.value);
    }, []);

    const onChangeYearOfPublishing = React.useCallback(e => {
        setInputYearOfPublishing(e.target.value);
    }, []);

    const onClickCancelButton = React.useCallback(
        () => {
            setInputTitle(name);
            setInputAuthor(author);
            setInputYearOfPublishing(yearOfPublishing);
            dispatch(cancelChanges());
            changeVisible();
        },
        [author, changeVisible, dispatch, name, yearOfPublishing]
    );
    
    return (
        <Drawer
            title="Информация о книге"
            placement="right"
            closable={false}
            visible={visible}
            width={1000}
            footer={
                <div style={{ textAlign: 'right' }}>
                    <Button style={{ marginRight: 8 }} onClick={onClickCancelButton}>
                        Cancel
                    </Button>
                    <s.ButtonStyled
                        type="primary"
                        style={buttonStyles}
                        onClick={onClick}
                        loading={isSaving}
                    >
                        Save
                    </s.ButtonStyled>
                </div>
            }
        >
            <s.BookWrapperComponentStyled>
                <s.BlockInfoStyled>
                    <s.DescriptionsStyled title="" column={1}>
                        <Descriptions.Item label="Название книги">
                            <ItemComponent item={inputTitle} onChange={onChangeInputTitle} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Автор">
                            <ItemComponent item={inputAuthor} onChange={onChangeInputAuthor} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Год издания">
                            <ItemComponent item={inputYearOfPublishing} onChange={onChangeYearOfPublishing} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Количество страниц">{currentBookInfo.numberOfPages}</Descriptions.Item>
                        <Descriptions.Item label="Статус книги">
                            <StatusComponent
                                inStock={currentBookInfo.inStock}
                                reader={currentBookInfo.reader}
                                returnDate={currentBookInfo.returnDate}
                            />
                        </Descriptions.Item>
                        <Descriptions.Item label="Описание">
                            {currentBookInfo.description || 'Нет информации'}
                        </Descriptions.Item>
                    </s.DescriptionsStyled>
                </s.BlockInfoStyled>
            </s.BookWrapperComponentStyled>
        </Drawer>
    );
};
