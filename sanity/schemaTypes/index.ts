import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { opportunity } from './opportunity'
import { playlist } from './playlist'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, opportunity, playlist],
}
