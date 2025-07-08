import {View, Text, Button, Alert} from 'react-native'
import {Link, router} from "expo-router";
import {useState} from "react";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {createUser} from "@/lib/appwrite";


const SignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [form, setForm] = useState({name:"",email:"",password:''});

    const submit = async () => {
        const {name, email, password} = form
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!name || !email || !password || !emailRegex.test(email)) return  Alert.alert('Error','Please enter valid name, email address & password.')

        setIsSubmitting(true)
        try {
            await createUser({
                email,
                password,
                name
            })

            router.replace('/')
        }catch(error:any) {
            Alert.alert("Error",error.message)
        }finally {
            setIsSubmitting(false)
        }
    }
    return (
        <View className={'gap-10 bg-white rounded-lg p-5 mt-5'}>
            <CustomInput
                placeholder="Enter Your Full Name"
                value={form.name}
                onChangeText={(text) => setForm((prev)=>({...prev, name: text}))}
                label='Full Name'
            />
            <CustomInput
                placeholder="Enter Your Email"
                value={form.email}
                onChangeText={(text) => setForm((prev)=>({...prev, email: text}))}
                label='Email'
                keyboardType={'email-address'}
            />
            <CustomInput
                placeholder="Enter Your Password"
                value={form.password}
                onChangeText={(text) => setForm((prev)=>({...prev, password: text}))}
                label='Password'
                secureTextEntry={true}
            />
            <CustomButton
                title="Sign Up"
                isLoading={isSubmitting}
                onPress={submit}
            />
            <View className={'flex flex-row justify-center mt-5 gap-2'}>
                <Text className={'base-regular text-gray-100'}>
                    Already have an account?
                </Text>
                <Link href="/sign-in" className={'base-bold text-primary'}>
                    Sign In
                </Link>
            </View>
        </View>
    )
}
export default SignUp
