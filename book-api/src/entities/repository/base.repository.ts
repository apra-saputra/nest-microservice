import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs'

@Injectable()
export class BaseRepository<t> implements OnModuleInit {
  protected localData: t[] = [];

//   path: fs.PathOrFileDescriptor
  

  constructor(private readonly path:string){
    this.path = path
  }

  onModuleInit() {
    if (!this.localData.length) this.read();
  }

  private read() {
    try {
      const fileContent = fs.readFileSync(
        this.path,
        'utf-8',
      );
      const favorites = JSON.parse(fileContent) as t[];
      this.localData = favorites;
      console.log('data loaded');
    } catch (error) {
      console.error('Failed to load data:', error);
      this.localData = []; // Set an empty array if there is an issue with loading
    }
  }

  protected save() {
    try {
      fs.writeFileSync(
        this.path,
        JSON.stringify(this.localData, null, 2), // Save the favorites with 2-space indentation for readability
        'utf-8',
      );
      console.log('data saved successfully.');
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  }
}
