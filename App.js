/*
  Examen I Parcial - Desarrollo de Apps Multidispositivo I
  Aplicación: Catálogo de Cursos
  Integrantes:
    1. Mercedes Miranda
    2. Yuridia Pichardo
    3. Wendy Pichardo
*/
import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  Switch,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// A. Arreglo local con los cuatro cursos
const cursos = [
  { id: '1', nombre: 'React Native', horas: 20, descripcion: 'Desarrollo de aplicaciones móviles.' },
  { id: '2', nombre: 'Diseño Web', horas: 18, descripcion: 'Creación de interfaces para sitios web.' },
  { id: '3', nombre: 'Ofimática', horas: 16, descripcion: 'Uso de documentos, presentaciones y hojas de cálculo.' },
  { id: '4', nombre: 'Marketing Digital', horas: 12, descripcion: 'Estrategias de comunicación digital.' }
];

// Elemento presionable de la lista
function CursoItem({ curso, onPress }) {
  return (
    <Pressable style={styles.item} onPress={onPress}>
      <View>
        <Text style={styles.nombre}>{curso.nombre}</Text>
        <Text style={styles.horas}>{curso.horas} horas</Text>
      </View>
      <Text style={styles.flecha}>{'>'}</Text>
    </Pressable>
  );
}

// Pantalla Inicio: lista de cursos con FlatList
function InicioScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Catálogo de Cursos</Text>
      <FlatList
        data={cursos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CursoItem
            curso={item}
            onPress={() => navigation.navigate('Detalle', { curso: item })}
          />
        )}
      />
    </View>
  );
}

// Pantalla Detalle: datos del curso + formulario
function DetalleScreen({ route }) {
  const { curso } = route.params;

  // C. Estados del formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [acepta, setAcepta] = useState(false);

  // D. Validaciones y confirmación
  const confirmar = () => {
    if (nombre.trim() === '') {
      Alert.alert('Error', 'Deben escribir sus nombres');
      return;
    }
    if (correo.trim() === '') {
      Alert.alert('Error', 'Debe escribir su correo');
      return;
    }
    if (!correo.includes('@')) {
      Alert.alert('Error', 'El correo no es válido');
      return;
    }
    if (!acepta) {
      Alert.alert('Error', 'Debe aceptar las condiciones');
      return;
    }
    Alert.alert(
      'Interés registrado',
      `${nombre.trim()}, su interés en el curso ${curso.nombre} fue registrado.`
    );
  };

  return (
    <ScrollView
      style={styles.detalle}
      contentContainerStyle={styles.detalleContenido}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.tituloDetalle}>{curso.nombre}</Text>
      <Text style={styles.textoDetalle}>{curso.horas} horas</Text>
      <Text style={styles.descripcion}>{curso.descripcion}</Text>

      <Text style={styles.etiqueta}>Nombres:</Text>
      <TextInput
        style={styles.input}
        placeholder="Escriban sus nombres"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.etiqueta}>Correo:</Text>
      <TextInput
        style={styles.input}
        placeholder="ejemplo@correo.com"
        value={correo}
        onChangeText={setCorreo}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <View style={styles.fila}>
        <Text style={styles.textoSwitch}>Acepto condiciones</Text>
        <Switch value={acepta} onValueChange={setAcepta} />
      </View>

      <Pressable style={styles.boton} onPress={confirmar}>
        <Text style={styles.textoBoton}>Confirmar interés</Text>
      </Pressable>
    </ScrollView>
  );
}

// B. Navegación Stack con rutas Inicio y Detalle
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen
          name="Inicio"
          component={InicioScreen}
          options={{ title: 'Inicio' }}
        />
        <Stack.Screen
          name="Detalle"
          component={DetalleScreen}
          options={{ title: 'Detalle' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// E. Estilos (padding, margin y Flexbox)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: '#F5F7FA',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#0D4E65',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D6E1E8',
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  horas: {
    fontSize: 14,
    marginTop: 5,
    color: '#5C6974',
  },
  flecha: {
    fontSize: 22,
    color: '#0D4E65',
  },
  detalle: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  detalleContenido: {
    padding: 24,
  },
  tituloDetalle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0D4E65',
    marginBottom: 8,
  },
  textoDetalle: {
    fontSize: 17,
    marginBottom: 8,
  },
  descripcion: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  etiqueta: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#B8C4CE',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  textoSwitch: {
    fontSize: 15,
  },
  boton: {
    backgroundColor: '#0D4E65',
    padding: 14,
    borderRadius: 9,
  },
  textoBoton: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});