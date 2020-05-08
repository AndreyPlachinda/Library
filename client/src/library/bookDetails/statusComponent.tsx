import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux";
import {ActiveButtonStyled, ModalBodyLabelStyled, StatusBlockStyled} from "../styled";
import {DatePicker, Input, Modal} from "antd";
import {changeStatusBook} from "../redux/actions";

const inputStyles: React.CSSProperties = { marginLeft: '8px' };

export const StatusComponent: React.FC<
{
  inStock: boolean;
  reader: string;
  returnDate: string
}> = ({ inStock, reader, returnDate }) => {
    const dispatch = useDispatch();
    const [visible, setVisible] = React.useState(false);
    const [inputReader, setInputReader] = React.useState('');
    const [inputReturnDate, setInputReturnDate] = React.useState('');
    const [inputReturnDateMoment, setInputReturnDateMoment] = React.useState(null);

    const onOk = React.useCallback(() => {
        setVisible(false);
        setInputReturnDate('');
        setInputReader('');
        setInputReturnDateMoment(null);
        dispatch(changeStatusBook({ reader: inputReader, returnDate: inputReturnDate }));
    }, [dispatch, inputReader, inputReturnDate]);

    const onClickReturnBookBut = React.useCallback(() => {
        dispatch(changeStatusBook({ reader: null, returnDate: null }));
    }, [dispatch]);
    
    const onCancel = React.useCallback(() => {
        setVisible(false);
        setInputReturnDate('');
        setInputReader('');
        setInputReturnDateMoment(null);
    }, []);

    const onClickTakeButton = React.useCallback(() => setVisible(true), []);
    
    const onChangeInputReader = React.useCallback(e => {
        setInputReader(e.target.value);
    }, []);

    const onChangeDatePicker = React.useCallback((date, dateString) => {
        setInputReturnDate(dateString);
        setInputReturnDateMoment(date);
    }, []);

    const ActiveButton = inStock
        ? <ActiveButtonStyled type="primary" onClick={onClickTakeButton}>Взять книгу</ActiveButtonStyled>
        : <ActiveButtonStyled
            type="primary"
            onClick={onClickReturnBookBut}
        >
            Вернуть книгу в библиотеку
        </ActiveButtonStyled>;

    return (
        <StatusBlockStyled>
            { inStock
                ? <div>В наличии</div>
                : (
                    <div>
                        Книги нет в наличии.
                        <div>{`Читатель: ${reader}`}</div>
                        <div>{`Дата возврата: ${returnDate}`}</div>
                    </div>
                )
            }
            {ActiveButton}
            <Modal
                title='Взять книгу на чтение'
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
            >
                <ModalBodyLabelStyled>
                    <div>Читатель:</div>
                    <Input style={inputStyles} value={inputReader} onChange={onChangeInputReader} />
                </ModalBodyLabelStyled>
                <ModalBodyLabelStyled>
                    <div>Дата возврата:</div>
                    <DatePicker value={inputReturnDateMoment} style={inputStyles} onChange={onChangeDatePicker} />
                </ModalBodyLabelStyled>
            </Modal>
        </StatusBlockStyled>
    );
};