class ViewMainScene {
    constructor(){
        this.config = [
            {
                type: 'row',
                height: 458,
                items: [
                    {
                        type: 'imgContainer',
                        name: 'lake',
                        float: 1,
                        img_src: 'img/lake.png',
                        items: [
                            {
                                type: 'imgContainer',
                                name: 'catch',
                                width: 180,
                                height: 92,
                                x: 170,
                                y: 270,
                                hidden: true
                            },
                            {
                                type: 'imgContainer',
                                name: 'float',
                                width: 40,
                                height: 40,
                                img_src: 'img/float.png',
                                hidden: true
                            }
                        ]
                    },
                    {
                        type: 'imgContainer',
                        name: 'cast',
                        width: 114,
                        img_src: 'img/cast.png'
                    }
                ]
            },
            {
                type: 'row',
                height: 40,
                items: [
                    {
                        type: 'container',
                        name: 'menu',
                        float: 1,
                        items: [
                            {
                                type: 'text',
                                name: 'experience',
                                float: 1
                            },
                            {
                                type: 'text',
                                name: 'gold',
                                float: 1
                            },
                            {
                                type: 'imgContainer',
                                name: 'btnShop',
                                width: 40,
                                img_src: 'img/shop.png'
                            },
                            {
                                type: 'imgContainer',
                                name: 'btnFishMarket',
                                width: 40,
                                img_src: 'img/fishMarket.png'
                            }
                        ]
                    },
                    {
                        type: 'container',
                        name: 'bag',
                        width: 200
                    }
                ]
            },
            {
                type: 'row',
                height: 2,
                items: [
                    {
                        type: 'container',
                        name: 'experience',
                        float: 1
                    }
                ]
            }
        ];
    }
}