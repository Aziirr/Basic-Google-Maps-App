export default async function register(user, navigation) {
    if (user.username !== '' && user.username !== '') {
        let response = await fetch('http://localhost:3000/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        response = await response.json()
        if (response.added) {
            navigation.navigate('Users', {users: response.users})
        } else {
        alert("Użytkownik o takim nicku już istnieje")
        }
    } else {
        alert("Proszę wpisać poprawne dane użytkownika")
    }
}