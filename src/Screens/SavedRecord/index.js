// import * as React from 'react';
// import {SafeAreaView, ScrollView, Alert, Text} from 'react-native';
// import {Appbar, List, Button} from 'react-native-paper';
// import {NfcTech} from 'react-native-nfc-manager';
// import * as AppContext from '../../AppContext';
// import RecordItem from './RecordItem';
// import SaveRecordModal from '../../Components/SaveRecordModal';

// function groupRecordByTech(records) {
//   const ndefRecords = [];
//   const nfcARecords = [];
//   const nfcVRecords = [];
//   const isoDepRecords = [];
//   for (let idx = 0; idx < records.length; idx++) {
//     const record = records[idx];
//     if (record.payload.tech === NfcTech.Ndef) {
//       ndefRecords.push({record, idx});
//     } else if (record.payload.tech === NfcTech.NfcA) {
//       nfcARecords.push({record, idx});
//     } else if (record.payload.tech === NfcTech.NfcV) {
//       nfcVRecords.push({record, idx});
//     } else if (record.payload.tech === NfcTech.IsoDep) {
//       isoDepRecords.push({record, idx});
//     }
//   }
//   return {
//     ndefRecords,
//     nfcARecords,
//     nfcVRecords,
//     isoDepRecords,
//   };
// }

// function SavedRecordScreen(props) {
//   const {navigation} = props;
//   const app = React.useContext(AppContext.Context);
//   const recordList = app.state.storageCache;
//   const [recordToCopy, setRecordToCopy] = React.useState(null);

//   async function clearAll() {
//     Alert.alert('CONFIRM', 'Are you sure?', [
//       {
//         text: 'DO IT',
//         onPress: async () => {
//           await app.actions.setStorage([]);
//         },
//       },
//       {
//         text: 'CANCEL',
//         onPress: () => 0,
//       },
//     ]);
//   }

//   async function removeIdx(idx) {
//     Alert.alert('CONFIRM', 'Are you sure?', [
//       {
//         text: 'DO IT',
//         onPress: async () => {
//           const nextRecordList = [...recordList];
//           nextRecordList.splice(idx, 1);
//           await app.actions.setStorage(nextRecordList);
//         },
//       },
//       {
//         text: 'CANCEL',
//         onPress: () => 0,
//       },
//     ]);
//   }

//   function goToHandler(savedRecordIdx, savedRecord) {
//     if (savedRecord.payload?.tech === NfcTech.Ndef) {
//       navigation.navigate('Main', {
//         screen: 'NdefWrite',
//         params: {
//           savedRecord,
//           savedRecordIdx,
//         },
//       });
//     } else if (savedRecord.payload?.tech === NfcTech.NfcA) {
//       navigation.navigate('Main', {
//         screen: 'CustomTransceive',
//         params: {
//           savedRecord,
//           savedRecordIdx,
//         },
//       });
//     } else if (savedRecord.payload?.tech === NfcTech.NfcV) {
//       navigation.navigate('Main', {
//         screen: 'CustomTransceive',
//         params: {
//           savedRecord,
//           savedRecordIdx,
//         },
//       });
//     } else if (savedRecord.payload?.tech === NfcTech.IsoDep) {
//       navigation.navigate('Main', {
//         screen: 'CustomTransceive',
//         params: {
//           savedRecord,
//           savedRecordIdx,
//         },
//       });
//     }
//   }

//   const {ndefRecords, nfcARecords, nfcVRecords, isoDepRecords} =
//     groupRecordByTech(recordList);

//   return (
//     <>
//       <Appbar.Header style={{backgroundColor: 'white'}}>
//         <Text style={{marginLeft: 10, fontSize: 24}}>MY RECORDS</Text>
//       </Appbar.Header>
//       <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
//         <List.Section>
//           <List.Subheader>NDEF ({ndefRecords.length})</List.Subheader>
//           {ndefRecords.map(({record, idx}) => (
//             <RecordItem
//               key={idx}
//               record={record}
//               idx={idx}
//               removeIdx={removeIdx}
//               goToHandler={goToHandler.bind(null, idx)}
//               onCopy={() => {
//                 console.warn(record);
//                 setRecordToCopy(record);
//               }}
//             />
//           ))}
//         </List.Section>

//         <List.Section>
//           <List.Subheader>NfcA ({nfcARecords.length})</List.Subheader>
//           {nfcARecords.map(({record, idx}) => (
//             <RecordItem
//               key={idx}
//               record={record}
//               idx={idx}
//               removeIdx={removeIdx}
//               goToHandler={goToHandler.bind(null, idx)}
//               onCopy={() => setRecordToCopy(record)}
//             />
//           ))}
//         </List.Section>

//         <List.Section>
//           <List.Subheader>NfcV ({nfcVRecords.length})</List.Subheader>
//           {nfcVRecords.map(({record, idx}) => (
//             <RecordItem
//               key={idx}
//               record={record}
//               idx={idx}
//               removeIdx={removeIdx}
//               goToHandler={goToHandler.bind(null, idx)}
//               onCopy={() => setRecordToCopy(record)}
//             />
//           ))}
//         </List.Section>

//         <List.Section>
//           <List.Subheader>IsoDep ({isoDepRecords.length})</List.Subheader>
//           {isoDepRecords.map(({record, idx}) => (
//             <RecordItem
//               key={idx}
//               record={record}
//               idx={idx}
//               removeIdx={removeIdx}
//               goToHandler={goToHandler.bind(null, idx)}
//               onCopy={() => setRecordToCopy(record)}
//             />
//           ))}
//         </List.Section>
//       </ScrollView>
//       <Button onPress={clearAll}>CLEAR ALL</Button>
//       <SafeAreaView />

//       <SaveRecordModal
//         title={'COPY THIS RECORD AS'}
//         visible={!!recordToCopy}
//         onClose={() => setRecordToCopy(null)}
//         onPersistRecord={async (name) => {
//           if (!recordToCopy) {
//             return false;
//           }

//           const nextList = AppContext.Actions.getStorage();
//           nextList.push({
//             name,
//             payload: recordToCopy.payload,
//           });

//           await AppContext.Actions.setStorage(nextList);
//           setRecordToCopy(null);
//         }}
//       />
//     </>
//   );
// }

// export default SavedRecordScreen;

import * as React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';

// Sample hardcoded users data
const initialUsers = [
  { id: '1', username: 'admin', email: '21bcs003@iiitdwd.ac.in' },
  { id: '2', username: 'test_user', email: '21bcs026@iiitdwd.ac.in' },
];

function SavedRecordScreen() {
  const [users, setUsers] = useState(initialUsers);

  // Function to delete a user by ID, except if the user is the first admin
  const deleteUser = (id) => {
    setUsers((prevUsers) => 
      prevUsers.filter((user) => user.id !== id || user.username === 'admin')
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User List</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <View>
              <Text style={styles.username}>{item.username}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => item.username !== 'admin' && deleteUser(item.id)}
              disabled={item.username === 'admin'}
            >
              <Text style={[styles.deleteButtonText, item.username === 'admin' && styles.disabledButtonText]}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  username: {
    fontSize: 18,
    fontWeight: '500',
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
  deleteButton: {
    backgroundColor: '#ff5c5c',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  disabledButtonText: {
    color: 'gray',
  },
});

export default SavedRecordScreen;
