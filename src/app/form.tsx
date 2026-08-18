
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, StyleSheet,
} from 'react-native';

type FormData = {
    name: string;
    email: string;
};

export default function Form() {
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: { name: '', email: '' },
    });

    const emailRef = useRef<TextInput>(null);

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Controller
                control={control}
                name="name"
                rules={{ required: '이름을 입력하세요' }}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="이름"
                        value={value}
                        onChangeText={onChange}
                        returnKeyType="next"
                        onSubmitEditing={() => emailRef.current?.focus()}
                    />
                )}
            />
            {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

            <Controller
                control={control}
                name="email"
                rules={{
                    required: '이메일을 입력하세요',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: '이메일 형식이 아닙니다' },
                }}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        ref={emailRef}
                        style={styles.input}
                        placeholder="이메일"
                        value={value}
                        onChangeText={onChange}
                        keyboardType="email-address"
                        returnKeyType="done"
                        onSubmitEditing={handleSubmit(onSubmit)}
                    />
                )}
            />
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

            <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>제출</Text>
            </Pressable>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 18, gap: 12 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12 },
    error: { color: 'red', fontSize: 12 },
    button: { backgroundColor: '#111', padding: 14, borderRadius: 8, alignItems: 'center'
    },
    buttonText: { color: '#fff' },
});