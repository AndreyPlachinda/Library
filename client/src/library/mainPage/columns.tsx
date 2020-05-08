import {ListType} from "../types";
import React from "react";
import {ButtonInfo} from "./ButtonInfo";

export const columns = [
    {
        title: 'Название книги',
        dataIndex: 'item',
        key: 'name',
        render: (_record: any, item: ListType) => <div key={item.id}>{item.name}</div>,
    },
    {
        title: 'Автор',
        dataIndex: 'item',
        key: 'author',
        render: (_record: any, item: ListType) => <div key={item.id}>{item.author}</div>,
    },
    {
        title: 'Год издательства',
        dataIndex: 'item',
        key: 'yearPub',
        render: (_record: any, item: ListType) => <div key={item.id}>{item.yearOfPublishing}</div>,
    },
    {
        title: '',
        dataIndex: 'item',
        key: 'action',
        render: (_record: any, item: ListType) => <ButtonInfo item={item} />,
    },
];