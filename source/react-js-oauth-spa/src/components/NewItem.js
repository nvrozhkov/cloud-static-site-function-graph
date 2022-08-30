import React, { useState, useContext } from 'react'
import { TokenContext, SettingsContext } from '../hooks/useOAuth';

export const NewItem = props => {
    const settings = useContext(SettingsContext);
    const { onItemAdded } = props;
    const [accessToken] = useContext(TokenContext);
    const [itemName, setItemName] = useState("");
    const [itemColor, setItemColor] = useState("");
    const [itemAge, setItemAge] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(settings.api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'appication/json',
                'Accept': 'application/json',
                "X-Access-Token": accessToken
            },
            body: JSON.stringify({
                "name": itemName,
                "color": itemColor,
                "age": itemAge
            })
        });
        setItemName("");
        setItemColor("");
        setItemAge(1);
        const responseJson = await response.json();
        onItemAdded(responseJson);
    }


    return (<>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newItemModal"><i className="bi bi-plus"></i> Добавить</button>
        <div className="modal" tabIndex={-1} id="newItemModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title">Создание элемента</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="form_name" className="form-label">Имя</label>
                                <input type="text" className="form-control" id="form_name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="form_color" className="form-label">Цвет</label>
                                <input type="text" className="form-control" id="form_color" value={itemColor} onChange={(e) => setItemColor(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="form_age" className="form-label">Возраст</label>
                                <input type="number" className="form-control" id="form_age" value={itemAge} onChange={(e) => setItemAge(parseInt(e.target.value))} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Добавить</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
    )
}
