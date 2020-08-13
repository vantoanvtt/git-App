import React,{useEffect,useState} from 'react';
import {View, StyleSheet, Text, Image, FlatList,ActivityIndicator, Alert} from 'react-native';
import {Card, FAB} from 'react-native-paper';
import {useDispatch,useSelector} from 'react-redux';

const Home = ({navigation}) => {
    /* const [data,setData] = useState([])
    const [loading,setLoading] = useState(true) */
    const dispatch = useDispatch()

    const {data,loading} = useSelector((state) => {
        return state
    })


    const fetchData = () => {
        fetch("http://192.168.1.30:3000/")
        .then(res=>res.json())
        .then(results=>{
            /* setData(results)
            setLoading(false) */
            dispatch({type: "ADD_DATA", payload: results})
            dispatch({type: "SET_LOADING", payload: false})
        }).catch(err => {
            Alert.alert("something went wrong!")
        })
    }

    useEffect(() => {
        fetchData();
    },[])

    const renderItem = ({item}) => {
        return (
            <Card 
                style={styles.myCard}
                onPress={() => {navigation.navigate('Profile',{item})}}
            >
                <View style={styles.cardView}>
                    <Image
                        style={styles.image}
                        source={{uri:item.picture}}
                    />
                    <View style={styles.textView}>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={styles.text}>{item.position}</Text>
                    </View>
                </View>
            </Card>
        );
    };

    const keyExtractor = (item) => item._id;

    return (
        <View>
            <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    onRefresh={() => {fetchData()}}
                    refreshing={loading}
                />
            <FAB 
                style={styles.fab}
                icon="plus"
                onPress={() => {navigation.navigate('Create')}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    myCard: {
        paddingTop: 30,
        margin: 5,
        borderColor: 'black'
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 30,
    },
    cardView: {
        flexDirection: 'row',
    },
    textView: {
        marginLeft: 15,
    },
    text: {
        fontSize: 18,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        bottom: 0,
        right: 0,
    }
});

export default Home;