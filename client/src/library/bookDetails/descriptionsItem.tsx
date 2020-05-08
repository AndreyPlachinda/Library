import React from "react";
import {InputItemStyled} from "../styled";

export const ItemComponent: React.FC<{ item: string; onChange: (e: any) => void }> = ({ item, onChange }) => {
    return <InputItemStyled value={item} onChange={onChange} />
};