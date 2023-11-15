import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../store/journal/journalSlice";
import { startNewNote } from "../../../store/journal/thunks";
import { FirebaseDB } from "../../../src/firebase";

describe('Test in Journal Thunks', () => { 

  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach( () => jest.clearAllMocks() );

  test('startNewNote should create a new blank note', async() => {

    const uid = 'TEST_UID';
    getState.mockReturnValue({ auth: { uid } });

    await startNewNote()( dispatch, getState );

    expect( dispatch ).toHaveBeenCalledWith( savingNewNote() );

    expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({
      body: '',
      title: '',
      imageUrls: [],
      id: expect.any( String ),
      date: expect.any( Number),
    }) );

    expect(dispatch).toHaveBeenCalledWith( setActiveNote({
      body: '',
      title: '',
      imageUrls: [],
      id: expect.any(String),
      date: expect.any(Number),
    }) );

    const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes` );
    const docs = await getDocs( collectionRef );

    const deletePromises = [];
    docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref )) );
    
    await Promise.all( deletePromises );
  });
  
})