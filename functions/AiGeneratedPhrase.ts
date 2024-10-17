import {CohereClientV2} from 'cohere-ai';

const cohere = new CohereClientV2({
  token: 'PjqT5xxrQJ62i5VCdDazaM9iYfY4F9IwFmonKsYx',
});

export const AiGeneratedPhrase = async (input: string): Promise<any> => {
  const generateCohere = async () => {
    const chat = await cohere.chat({
      model: 'command-r-plus',
      messages: [
        {
          role: 'user',
          content:
            'I will send you some words from which you need to make a sentence. That sentence should be in the imperative form starting with i want or i need, meaning it should demand something. The person who reads the sentence should understand what I want. Each sentence should contain some form of request, for example: {I want to go shopping}, {I want to eat}, {I want to go to the bathroom}. These are 3 examples you should follow. Every sentence has to start with: i need or i want, so the reader can know what the person wants to say.DONT ADD ADDITIONAL WORDS TO FURTHER THE MEANING JUST MAKE A SENTENCE OUT OF THE WORDS GIVEN AND ADD COMPOSITINAL WORDS FOR THE SENTENCE. ONLY GIVE ME ONE SENTENCE AND THAT SHOULD BE THE ONLY THING WRITTEN IN THE RESPONSE AND THE SENTENCE SHOULD BE IN CROATIAN LANGUAGE. The words from which you need to create a meaningful sentence that serves as a request to someone reading it are:' +
            input,
        },
      ],
    });

    // console.log('first');
    console.log(chat.message?.content!![0].text);
    return chat.message?.content!![0].text;
  };

  const text = await generateCohere();
  return text;
};
