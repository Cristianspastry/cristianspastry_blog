import { Ricetta } from "@/model/ricetta"
import { Category } from "@/model/category"




export const recipesData : Ricetta[] = [
    {
        id: 1,
        titolo: 'Ricetta 1',
        categoria: {
            id: '1',
            titolo: "Dolci",
            imageUrl: 'https://via.placeholder.com/150',
        },
        descrizione: 'Descrizione ricetta 1',
        tempoDiPreparazione: {
            tempo: '30',
            tipoTempo: 'minuti',
        },
        imageUrl: 'https://blog.giallozafferano.it/dulcisinforno/wp-content/uploads/2022/01/Pan-di-spagna-2764.jpg',
        ingredienti: [
            {
                titoloGruppo: 'Gruppo 1',
                ingredienti: [
                    {
                        quantita: '1',
                        tipoQuantita: 'unita',
                        nome: 'ingrediente 1',
                    },
                    {
                        quantita: '2',
                        tipoQuantita: 'unita',
                        nome: 'ingrediente 2',
                    },
                ],
            },
            {
                titoloGruppo: 'Gruppo 2',
                ingredienti: [
                    {
                        quantita: '3',
                        tipoQuantita: 'unita',
                        nome: 'ingrediente 3',
                    },
                    {
                        quantita: '4',
                        tipoQuantita: 'unita',
                        nome: 'ingrediente 4',
                    },
                ],
            },
        ],
        difficolta: 'Facile',
        passaggi: [
            'Passaggio 1',
            'Passaggio 2',
        ],
        note: " Note",
        data: " 2022-01-01",
    },
    {
        id: 1,
        titolo: 'Ricetta 1',
        categoria: {
            id: '1',
            titolo: "Dolci",
            imageUrl: 'https://via.placeholder.com/150',
        },
        descrizione: 'Descrizione ricetta 1',
        tempoDiPreparazione: {
            tempo: '30',
            tipoTempo: 'minuti',
        },
        imageUrl: 'https://blog.giallozafferano.it/dulcisinforno/wp-content/uploads/2022/01/Pan-di-spagna-2764.jpg',
        ingredienti: [
            {
                titoloGruppo: 'Gruppo 1',
                ingredienti: [
                    {
                        quantita: '1',
                        tipoQuantita: 'unita',
                        nome: 'ingrediente 1',
                    },
                    {
                        quantita: '2',
                        tipoQuantita: 'unita',
                        nome: 'ingrediente 2',
                    },
                ],
            },
            {
                titoloGruppo: 'Gruppo 2',
                ingredienti: [
                    {
                        quantita: '3',
                        tipoQuantita: 'unita',
                        nome: 'ingrediente 3',
                    },
                    {
                        quantita: '4',
                        tipoQuantita: 'unita',
                        nome: 'ingrediente 4',
                    },
                ],
            },
        ],
        difficolta: 'Facile',
        passaggi: [
            'Passaggio 1',
            'Passaggio 2',
        ],
        note: " Note",
        data: " 2022-01-01",
    },
    {
        id: 1,
        titolo: 'Ricetta 1',
        categoria: {
            id: '1',
            titolo: "Dolci",
            imageUrl: 'https://via.placeholder.com/150',
        },
        descrizione: 'Descrizione ricetta 1',
        tempoDiPreparazione: {
            tempo: '30',
            tipoTempo: 'minuti',
        },
        imageUrl: 'https://blog.giallozafferano.it/dulcisinforno/wp-content/uploads/2022/01/Pan-di-spagna-2764.jpg',
        ingredienti: [
            {
                titoloGruppo: 'Gruppo 1',
                ingredienti: [
                    {
                        quantita: '1',
                        tipoQuantita: 'unita',
                        nome: 'ingrediente 1',
                    },
                    {
                        quantita: '2',
                        tipoQuantita: 'unita',
                        nome: 'ingrediente 2',
                    },
                ],
            },
            {
                titoloGruppo: 'Gruppo 2',
                ingredienti: [
                    {
                        quantita: '3',
                        tipoQuantita: 'unita',
                        nome: 'ingrediente 3',
                    },
                    {
                        quantita: '4',
                        tipoQuantita: 'unita',
                        nome: 'ingrediente 4',
                    },
                ],
            },
        ],
        difficolta: 'Facile',
        passaggi: [
            'Passaggio 1',
            'Passaggio 2',
        ],
        note: " Note",
        data: " 2022-01-01",
    },
]

export default recipesData