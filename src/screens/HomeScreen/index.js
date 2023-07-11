import {FlatList, View} from 'react-native';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ListItemSeparator from "../../components/ListItemSeparator";
import OrchidListItem from "../../components/OrchidListItem";

const orchids = [
    {
        id: 1,
        name: 'Phalaenopsis',
        description: 'Loại hoa lan phổ biến và được trồng rộng rãi. Có nhiều màu sắc và hình dạng khác nhau.',
        isFavourite: false,
        imageUrl: 'https://i.pinimg.com/564x/a3/8a/fd/a38afd4163474708f1b72e5c457f9598.jpg',
    },
    {
        id: 2,
        name: 'Cattleya',
        description: 'Hoa lan Cattleya nổi tiếng với những bông hoa lớn, thường có mùi hương thơm và có đa dạng màu sắc.',
        isFavourite: false,
        imageUrl: 'https://i.pinimg.com/564x/ba/c8/9e/bac89e54ddb501467a47e43d78df55c6.jpg',
    },
    {
        id: 3,
        name: 'Dendrobium',
        description: 'Loại hoa lan này có nhiều loài và hình dạng khác nhau, từ những bông nhỏ và đơn giản đến những bông lớn và phức tạp.',
        isFavourite: false,
        imageUrl: 'https://i.pinimg.com/564x/6f/a9/a4/6fa9a4d40605f5b2cf624c52adea87e4.jpg',
    },
    {
        id: 4,
        name: 'Oncidium',
        description: 'Hoa lan Oncidium có bông hoa nhỏ và nhiều màu sắc. Một số loài cũng có mùi hương tương đối mạnh.',
        isFavourite: false,
        imageUrl: 'https://i.pinimg.com/564x/2e/8e/23/2e8e233fc1383c289d7df90c45299c4c.jpg',
    },
    {
        id: 5,
        name: 'Vanda',
        description: 'Loại hoa lan này có bông hoa lớn và sáng màu, thường được trồng trong không gian treo hoặc trong vườn.',
        isFavourite: false,
        imageUrl: 'https://www.pflanzenblog-in.de/wp-content/uploads/2016/08/2016-08-07-IMG_0853.jpg',
    },
    {
        id: 6,
        name: 'Miltonia',
        description: 'Hoa lan Miltonia có bông hoa tương đối lớn và thường có hình dạng tròn.',
        isFavourite: false,
        imageUrl: 'http://2.bp.blogspot.com/-1DdUi6sjf_0/T4ti7PTnpgI/AAAAAAAAAfw/omj1uI3E7VI/s1600/April+2012+101+copy2.jpg',
    },
    {
        id: 7,
        name: 'Brassia',
        description: 'Loại hoa lan này được biết đến với cái tên "hoa chuỗi nhện" vì hình dạng bông hoa giống một con nhện.',
        isFavourite: false,
        imageUrl: 'http://g-kamu.com/sozai/burassia-gireo-diana-hana-tate-ll.jpg',
    },
    {
        id: 8,
        name: 'Phragmipedium',
        description: 'Loại hoa lan có hình dạng độc đáo và đặc trưng với các cánh hoa dạng giày.',
        isFavourite: false,
        imageUrl: 'https://static.uwalls.com/products/33000/33589/u13328p_1200.webp',
    },
    {
        id: 9,
        name: 'Bulbophyllum',
        description: 'Hoa lan Bulbophyllum có hình dạng đa dạng và nổi bật với các cánh hoa lớn và màu sắc sặc sỡ.',
        isFavourite: false,
        imageUrl: 'https://preview.redd.it/i60pjm1ngm181.jpg?width=1080&crop=smart&auto=webp&v=enabled&s=2e7f7986b16ae1d07b24bb799de4b5bf7992db3d',
    },
    {
        id: 10,
        name: 'Cymbidium',
        description: 'Loại hoa lan có bông hoa lớn, thường có nhiều cánh hoa và có màu sắc đa dạng.',
        isFavourite: false,
        imageUrl: 'https://i.pinimg.com/564x/1c/1f/1e/1c1f1e440416b9f661faec143ae10ab8.jpg',
    }
];

const HomeScreen = ({route, navigation}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        syncData();
    }, [data]);

    useEffect(() => {
        if (route.params?.item) {
            route.params = null;
            getData();
        }
    });

    const syncData = async () => {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem('orchids', jsonValue);
    }

    const getData = async () => {
        const jsonValue = await AsyncStorage.getItem('orchids');
        if (jsonValue) {
            setData(JSON.parse(jsonValue));
        } else {
            setData(orchids);
        }
    };

    const toggleFavourite = async (item) => {
        setData(data.map(o => {
            if (o.id === item.id) {
                o.isFavourite = !o.isFavourite;
            }
            return o;
        }));
    }

    return <View>
        <FlatList
            data={data}
            renderItem={({item}) => {
                return <OrchidListItem item={item} toggleFavourite={toggleFavourite} navigation={navigation}/>
            }}
            ItemSeparatorComponent={ListItemSeparator}
        />
    </View>;
}

export default HomeScreen;