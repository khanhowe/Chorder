import axios from 'axios';
import { APIRoutes } from './apiRoutes';

export interface CreateChordDto {
    name: string;
    description?: string;
    notes: string;
}

export class ChordService {
    saveChord = async (createChordDto: CreateChordDto) => {
        console.log(axios.defaults.headers.common['Authorization'])
        try {
            const response = await axios.post(
                APIRoutes.CREATE_CHORD,
                createChordDto,
            );
            return response.data;
        } catch (error) {
            // Handle errors here
            console.error('Error saving chord', error);
        }
    };
    
    getChord = async (id: string) => {
        try {
            const response = await axios.get(`${APIRoutes.GET_CHORD}/${id}`);
            return response.data;
        } catch (error) {
            // Handle errors here
            console.error('Error getting chord', error);
        }
    };

}
