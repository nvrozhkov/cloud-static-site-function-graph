import React, { useEffect, useState, useContext } from 'react';
import { SettingsContext, TokenContext } from '../hooks/useOAuth';
import { NewItem } from './NewItem';

export const DataTable = () => {
    const settings = useContext(SettingsContext);
    const [accessToken] = useContext(TokenContext);

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [accessToken]);

    function wait(delay){
        return new Promise((resolve) => setTimeout(resolve, delay));
    }

    function fetchRetry(url, fetchOptions, tries = 5, delay = 500) {
        function onError(err){
            let triesLeft = tries - 1;
            if(!triesLeft){
                throw err;
            }
            return wait(delay).then(() => fetchRetry(url, delay, triesLeft, fetchOptions));
        }
        return fetch(url,fetchOptions).catch(onError);
    }

    const fetchData = async () => {
        if (accessToken) {
            const response = await fetchRetry(settings.api_url,
                {
                    headers: {
                        "X-Access-Token": accessToken
                    }
                });
            const responseJson = await response.json();
            setData(responseJson);
            setIsLoading(false);
        }
    }

    const deleteItem = async (id) => {
        const response = await fetch(`${settings.api_url}/${id}`, {
            method: "DELETE",
            headers: {
                "X-Access-Token": accessToken
            }
        });
        if (response.status === 204) {
            setData(data.filter(item => item.id !== id));
        }
    }

    const handleItemAdded = (newItem) => {
        setData([...data, newItem]);
    }

    return (<>
        <div className="table-title">
            <div className="row">
                <div className="col-sm-8"><h3>Данные из API</h3></div>
                <div className="col-sm-4 d-flex justify-content-end">
                    <NewItem onItemAdded={handleItemAdded} />
                </div>
            </div>
        </div>
        {
            isLoading && <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        }
        {
            data.length > 0 && <table className="table">
                <thead>
                    <tr>
                        {Object.keys(data[0]).filter(key => key !== "id").map(key => (<th scope="col" key={key}>{key}</th>))}
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (<tr key={item.id}>
                        {Object.keys(data[0]).filter(key => key !== "id").map(key => (<td key={key}>{item[key]}</td>))}
                        <td><button className='btn btn-outline-danger btn-sm' onClick={() => deleteItem(item.id)}><i className="bi bi-trash3"></i></button></td>
                    </tr>))}
                </tbody>
            </table>
        }
        {
            data.length === 0 && !isLoading && <span>Нет данных</span>
        }
    </>);
}