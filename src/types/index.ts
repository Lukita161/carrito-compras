export type GuitarT = {
    id: number,
    name: string,
    image: string,
    description: string,
    price: number
}

export type CartItem = Omit<GuitarT, 'description'> & {
    quantity: number
}

