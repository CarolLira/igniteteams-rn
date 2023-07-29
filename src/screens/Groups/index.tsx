// import { StyleSheet } from 'react-native';

// --> Another way to import files
// import * as Styles from './styles';

import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';

import {
  Container,
} from './styles';
import { Button } from '@components/Button';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title="Turmas"
        subtitle="jogue com a sua turma"
      />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard title={item} />
        )}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={() => (
          <ListEmpty message='Que tal cadastrar a primeira turma?' />
        )}
        showsVerticalScrollIndicator={false}
      />
      <Button
        title='Criar nova turma'
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