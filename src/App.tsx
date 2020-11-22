import React, { useState, useEffect } from 'react';
import './App.css';

const cardsArray = [
    {
        id: 1,
        code: 1,
        img: 'https://picsum.photos/id/555/200/200',
    },
    {
        id: 2,
        code: 2,
        img: 'https://picsum.photos/id/666/200/200',
    },
    {
        id: 3,
        code: 3,
        img: 'https://picsum.photos/id/888/200/200',
    },
    {
        id: 4,
        code: 2,
        img: 'https://picsum.photos/id/666/200/200',
    },
    {
        id: 5,
        code: 3,
        img: 'https://picsum.photos/id/888/200/200',
    },
    {
        id: 6,
        code: 1,
        img: 'https://picsum.photos/id/555/200/200',
    },
    {
        id: 7,
        code: 4,
        img: 'https://picsum.photos/id/777/200/200',
    },
    {
        id: 8,
        code: 6,
        img: 'https://picsum.photos/id/99/200/200',
    },
    {
        id: 9,
        code: 4,
        img: 'https://picsum.photos/id/777/200/200',
    },
    {
        id: 10,
        code: 5,
        img: 'https://picsum.photos/id/55/200/200',
    },
    {
        id: 11,
        code: 5,
        img: 'https://picsum.photos/id/55/200/200',
    },
    {
        id: 12,
        code: 6,
        img: 'https://picsum.photos/id/99/200/200',
    },
];

type CardGameState = {
    clickedCard?: {
        id: number;
        code: number;
        time: number;
    };
    solvedCards: Array<number>;
};

const refreshPage = () => { 
    window. location. reload(false); 
}

const shuffleArray = (cardsArray: any) => {
    return cardsArray.sort(() => .5 - Math.random());
}

shuffleArray(cardsArray);

const App = (props: any) => {
    const [state, setState] = useState<CardGameState>({ solvedCards: [] });

    const onCardClick = React.useCallback(
        (id: number) => {
            const card = cardsArray.find(x => x.id === id);

            if (card) {
                if (state.clickedCard && state.clickedCard.code === card.code) {
                    setState({
                        solvedCards: [card.id, state.clickedCard.id, ...state.solvedCards],
                    });
                } else {
                    setState({
                        ...state,
                        clickedCard: {
                            ...card,
                            time: new Date().getTime()
                        },
                    })
                }
            }
        }, [state]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (state.clickedCard) {
                const currentTime = new Date().getTime();

                const timeDiff = currentTime - state.clickedCard.time;

                if (timeDiff > 2000) {
                    setState({ solvedCards: state.solvedCards });
                }
            }
        }, 100);

        return () => clearInterval(interval);
    });

    const openCards = state.clickedCard ? [state.clickedCard.id, ...state.solvedCards] : state.solvedCards;

    return (
        <div>
            <div className="button-wrapper">
                <button 
                    className="new-game-button"
                    onClick={refreshPage}
                >
                        NEW GAME
                </button>
            </div>            
            <div className="card-wrapper">
                <div className="card">
                    {cardsArray.map(card =>
                        <Card
                            key={card.id}
                            id={card.id}
                            img={card.img}
                            onClick={onCardClick}
                            openCards={openCards}
                            cover={""}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

type CardProps = {
    id: number;
    img: string;
    cover: string;
    openCards: Array<number>;
    onClick: (cardId: number) => void;
};

const Card = (props: CardProps) => {
    const isOpened = props.openCards.some(x => x === props.id);

    return (
        <div
            key={props.id}
            className="card__image-wrapper"
            onClick={() => isOpened ? undefined : props.onClick(props.id)}
        >
            {isOpened
                ? <img src={props.img} alt="" className="card__image" />
                : <img src={props.cover} alt="" className="card__image" />
            }
        </div>
    );
};

export default App;

