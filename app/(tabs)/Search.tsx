import {View, Text, Button} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import seed from "@/lib/seed";

const Search = () => {
    return (
        <SafeAreaView>
            <Text>Search</Text>
            <Button title={'seed'} onPress={()=>seed().catch((error)=> console.log("Failed to seed the database",error.message))}/>
        </SafeAreaView>
    )
}
export default Search
