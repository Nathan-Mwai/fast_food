import {Redirect, Tabs} from "expo-router";
import useAuthStore from "@/store/auth.store";
import {TabBarIconProps} from "@/type";
import {Image, Text, View} from "react-native";
import {images} from "@/constants";
import cn from "clsx";

const TabBarIcon = ({focused, icon, title}:TabBarIconProps) => (
    <View className={'tab-icon'}>
        <Image source={icon} className='size-7' resizeMode="contain" tintColor={focused ? "#FE8C00" : '#5D5F6D'} />
        <Text className={cn('text-sm font-bold',focused?"text-primary":"text-gray-200")}>{title}</Text>
    </View>
)

export default function TabLayout() {
    const {isAuthenticated} = useAuthStore();

     if (!isAuthenticated) return <Redirect href={'/'}/>
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle:{
                   borderTopLeftRadius:50,
                   borderTopRightRadius:50,
                   borderBottomLeftRadius:50,
                   borderBottomRightRadius:50,
                    marginHorizontal:20,
                    height:80,
                    position:'absolute',
                    bottom:40,
                    backgroundColor:'white',
                    shadowColor:'#1a1a1a',
                    shadowOffset:{
                       width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius:4,
                    elevation:5,
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title:"Home",
                    headerShown:false,
                    tabBarIcon:({ focused}) => <TabBarIcon title={'Home'} focused={focused} icon={images.home}/>
                }}
            />
            <Tabs.Screen
                name="Search"
                options={{
                    title:"Search",
                    headerShown:false,
                    tabBarIcon:({ focused}) => <TabBarIcon title={'Search'} focused={focused} icon={images.search}/>
                }}
            />
            <Tabs.Screen
                name="Cart"
                options={{
                    title:"Cart",
                    headerShown:false,
                    tabBarIcon:({ focused}) => <TabBarIcon title={'Cart'} focused={focused} icon={images.bag}/>
                }}
            />
            <Tabs.Screen
                name="Profile"
                options={{
                    title:"Profile",
                    headerShown:false,
                    tabBarIcon:({ focused}) => <TabBarIcon title={'Profile'} focused={focused} icon={images.person}/>
                }}
            />
        </Tabs>
    )
}
