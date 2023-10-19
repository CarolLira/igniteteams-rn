// import { StyleSheet } from 'react-native';

// --> Another way to import files
// import * as Styles from './styles';

import React, { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { Alert, FlatList } from 'react-native';
import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';
import { getAllGroups } from '@storage/group/getAllGroups';

import {
  Container,
} from './styles';
import { Button } from '@components/Button';
import { Loading } from '@components/Loading';

export function Groups() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('newGroup');
  }

  async function fetchGroups() {
    try {
      setIsLoading(true);
      const data = await getAllGroups();
      setGroups(data);
    } catch (error) {
      console.log(error);
      Alert.alert('Turmas', 'Não foi possível carregar as turmas.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group });
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, []));

  return (
    <Container>
      <Header />
      <Highlight
        title="Turmas"
        subtitle="jogue com a sua turma"
      />

      {
        isLoading ? <Loading /> :
          <FlatList
            data={groups}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <GroupCard
                title={item}
                onPress={() => handleOpenGroup(item)}
              />
            )}
            contentContainerStyle={groups.length === 0 && { flex: 1 }}
            ListEmptyComponent={() => (
              <ListEmpty message='Que tal cadastrar a primeira turma?' />
            )}
            showsVerticalScrollIndicator={false}
          />
      }

      <Button
        title='Criar Nova Turma'
        onPress={handleNewGroup}
      />
    </Container>
  );
}

// ---> StyleSheet from React Native
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     color: '#FFF',
//     fontSize: 32,
//   }
// });