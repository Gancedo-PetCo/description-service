const count = require('./csvHelpertest.js');

async function cheese() {
  try {
    var cheeseVariable = await countLines('attributes');
    console.log(cheeseVariable);
    // console.log('IN CHEESE', attributeCount);
    // return attributeCount;
    // resolve(attributeCount);
  } catch (error) {
    console.log('ERROR', error);
  }
}
cheese();
describe('Seeding Script Should generate the correct number of lines', () => {
  //

  beforeAll(() => {
    descriptionLineCount = count.countLines('description');
    attributesLineCount = count.countLines('attributes');
    detailsLineCount = count.countLines('details');
    directionsLineCount = count.countLines('directions');
  });

  it('should count 50 lines in the description csv file', () => {
    expect(descriptionLineCount).toBe(50);
  });
  //
  it('should count 50 lines in the attributes csv file', () => {});
  //
  it('should count 50 lines in the directions csv file', () => {});
  //
  it('should count 50 lines in the details csv file', () => {});
});
