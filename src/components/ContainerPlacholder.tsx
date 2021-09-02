import React from 'react';

export const ContainerPlacholder: React.FC = () => {
    return (
        <div className="containerPlacholder">
            <img className="cloud" src="images/cloud.svg" alt="cloud" />
            <p className="default">Fill in all the fields and the weather will be displayed</p>
        </div>
    )
}