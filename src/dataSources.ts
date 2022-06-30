import * as changeCase from 'change-case';
import * as dateFns from 'date-fns';
import * as R from 'ramda';
import { randomInt } from './helpers/randomInt';
import { shuffleArray } from './helpers/shuffleArray';

const generateDate = R.compose(
  dateFns.formatISO,
  (d: Date) => R.curry(dateFns.addSeconds)(d, -30 + randomInt(1, 60)),
  (d: Date) => R.curry(dateFns.addMinutes)(d, -30 + randomInt(1, 60)),
  (d: Date) => R.curry(dateFns.addHours)(d, -12 + randomInt(1, 24)),
  (d: Date) => R.curry(dateFns.addDays)(d, -randomInt(10, 90)),
);

export let data = {
  increment: (start = 0) => {
    let value = start;
    return () => {
      let returnVal = value++;
      return returnVal;
    };
  },
  lipsum: () =>
    shuffleArray([
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi elementum ex euismod, convallis lectus quis, aliquet nunc. Aliquam ut sapien magna. Donec iaculis nibh leo. Aenean convallis erat non metus vulputate, eget placerat neque sodales. Vivamus non enim nec odio volutpat egestas. Duis justo erat, vehicula in nulla id, sollicitudin convallis ligula. Aliquam feugiat arcu ut odio tempus hendrerit at gravida sem. Nam id congue eros, at semper velit. Ut ac gravida enim. Nam et mauris a odio porttitor molestie. Vestibulum pharetra orci eget auctor vulputate. Donec sodales gravida urna nec sagittis. Donec ac pretium lorem, id fringilla augue.`,
      `Morbi sem orci, semper sit amet rhoncus sit amet, lacinia efficitur libero. Fusce luctus sed ligula quis hendrerit. Vestibulum lacinia risus eu magna placerat, sit amet aliquet diam aliquam. Morbi at laoreet risus, eleifend egestas velit. Morbi pretium massa non nulla posuere, a tristique quam bibendum. Cras finibus velit vel metus viverra efficitur. Donec luctus ipsum a ante bibendum, ultrices interdum ligula varius. Cras tempor egestas tortor, in iaculis diam tristique ut. In mollis nulla vitae elit vestibulum, et mattis quam dignissim. Ut tincidunt nulla quis mauris elementum sollicitudin at sed mi. Pellentesque euismod augue sit amet volutpat ornare. Donec egestas sem arcu, ut tempor metus auctor sed.`,
      `Curabitur facilisis faucibus felis eu gravida. Fusce id magna condimentum justo suscipit faucibus. Pellentesque convallis congue velit ut varius. Quisque facilisis lacus blandit nibh laoreet imperdiet. Mauris nec felis at velit pretium finibus sit amet ac enim. Cras dignissim lacus et cursus dignissim. Nunc egestas tincidunt porttitor. Etiam velit nisi, dictum id rutrum nec, pulvinar rhoncus odio. Nunc venenatis bibendum faucibus. Vestibulum sollicitudin luctus rhoncus. Suspendisse potenti. Nulla nec auctor arcu. Nunc suscipit euismod rhoncus. Morbi ut nisl diam. Nunc id tellus eget felis semper interdum eu et lacus. Proin semper enim finibus, hendrerit quam eget, iaculis massa.`,
      `Suspendisse nec neque vehicula turpis volutpat suscipit ac eu neque. Etiam vulputate cursus odio ut sollicitudin. Integer velit nisi, pulvinar et tempor eget, cursus id magna. Integer risus diam, consequat eget efficitur at, sagittis sit amet tortor. Sed dapibus tempor libero id pellentesque. Maecenas non augue nec sem mollis ultrices id eu ipsum. Ut sed ornare massa. Phasellus dolor eros, rutrum sit amet urna sed, efficitur vestibulum velit. Nam quis rhoncus enim, eget malesuada nibh. Pellentesque ornare enim hendrerit nisl mattis porttitor scelerisque nec elit.`,
    ]).join('\n'),
  lyric: () =>
    [
      "We''re no strangers to love\nYou know the rules and so do I\nA full commitment''s what I''m thinking of\nYou wouldn''t get this from any other guy",
      'Never gonna give you up\nNever gonna let you down\nNever gonna run around and desert you',
      'Never gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you',
      "Standing here, I realize you were\nJust like me trying to make history.\nBut who''s to judge the right from wrong.",
      "When our guard is down I think we''ll both agree.\nThat violence breeds violence.\nBut in the end it has to be this way.",
      'Is this the real life?\nIs this just fantasy?\nCaught in a landside,\nNo escape from reality',
      "Mamaaa,\nJust killed a man,\nPut a gun against his head, pulled my trigger,\nNow he''s dead",
      "His palms are sweaty, knees weak, arms are heavy\nThere''s vomit on his sweater already, mom''s spaghetti",
      'Country roads, take me home\nTo the place I belong\nWest Virginia, mountain mama\nTake me home, country roads',
      'In the heart of holy see\nIn the home of Christianity\nThe seat of power is in danger',
      "There''s a foe of a thousand swords\nThey''ve been abandoned by their lords\nTheir fall from grace will pave their path, to damnation",
    ][randomInt(0, 10)],
  intID: () => randomInt(1, 9999),
  int: () => randomInt(1000, 100000),
  name: () =>
    [
      `Anne Ercanbald`,
      `Tilde Korrine`,
      `Roderick Blas`,
      `Priit Shiva`,
      `Lila Ireland`,
      `Cecily Sharma`,
      `Susanna Greaves`,
      `Makenzie Pace`,
      `Ema Moyer`,
      `Esa Mooney`,
      'Blade Meza',
      'Dominique Delarosa',
      'Jannat Norris',
      'Jayda Mellor',
      'Wyatt English',
      'Jayda Delarosa',
    ][randomInt(0, 10)],
  brandName: () =>
    [
      'Electrala',
      'PusaPower',
      'Foodono',
      'Snund',
      'Clothesy',
      'Stripes',
      'Drapely',
      'Coverlip',
      'LawnCloth',
      'KeyCyber',
      'MinGeek',
      'AutoKomp',
    ][randomInt(0, 10)],
  productName: () =>
    [
      'Good Food',
      'Animal Food',
      'Outerwears',
      'Formal Dresses',
      'Footwears',
      'Hardware',
      'Notebooks',
      'Decorations',
      'Dinningware',
      'Kitchenware',
      'Monitors',
    ][randomInt(0, 10)],
  date: () => generateDate(new Date()),
  boolean: () => [true, false][randomInt(0, 1)],
  choice: () => field => {
    let options = field.options.split('|');
    return options[randomInt(0, options.length - 1)];
  },
};

export default async schema => {
  return {
    name: 'GenerateData',
    data: (fields, pkId) => {
      let result: any = {};
      let useData = {
        ...data,
        increment: data.increment(pkId),
      };
      for (let each of fields) {
        let camelName = changeCase.camelCase(each.name);
        if (each.hint) {
          result[camelName] = useData[each.hint]?.();
          if (typeof result[camelName] == 'function') {
            result[camelName] = result[camelName](each);
          }
          continue;
        }

        if (['int', 'integer'].some(k => k == each.type)) {
          if (each.primaryKey) {
            if (each.primaryKey == 'autoGenerated') {
              result[camelName] = useData.increment();
            } else {
              result[camelName] = useData.intID();
            }
          } else {
            result[camelName] = useData.int();
          }
          continue;
        } else if (each.type == 'string' || each.type == 'varchar') {
          if (each.length && each.length <= 256) {
            result[camelName] = useData.name().substring(0, each.length);
          } else {
            result[camelName] = useData
              .lipsum()
              .substring(0, each.length ?? 9999);
          }
          continue;
        } else if (each.type == 'timestamp') {
          result[camelName] = useData.date();
          continue;
        } else if (each.type == 'boolean') {
          result[camelName] = useData.boolean();
          continue;
        }
      }
      return result;
    },
  };
};
