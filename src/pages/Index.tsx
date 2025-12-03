import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface Costume {
  id: number;
  name: string;
  image: string;
  age: string;
  theme: string;
  gender: string;
  price: number;
  bookedDates: Date[];
}

const costumes: Costume[] = [
  {
    id: 1,
    name: 'Супергерой',
    image: 'https://cdn.poehali.dev/projects/3af4e4b2-faf9-4ab7-bab5-aca147421294/files/a49ad539-95f5-4821-bc9e-4e60e43b4190.jpg',
    age: '5-7',
    theme: 'супергерои',
    gender: 'любой',
    price: 1500,
    bookedDates: [new Date(2025, 11, 15), new Date(2025, 11, 20)],
  },
  {
    id: 2,
    name: 'Принцесса',
    image: 'https://cdn.poehali.dev/projects/3af4e4b2-faf9-4ab7-bab5-aca147421294/files/1f184ee0-bdea-4baf-8c3c-92992ddfd378.jpg',
    age: '3-5',
    theme: 'сказки',
    gender: 'девочка',
    price: 2000,
    bookedDates: [new Date(2025, 11, 25)],
  },
  {
    id: 3,
    name: 'Пират',
    image: 'https://cdn.poehali.dev/projects/3af4e4b2-faf9-4ab7-bab5-aca147421294/files/8c7354c5-6a4c-49eb-bf98-3c985cfa1492.jpg',
    age: '5-7',
    theme: 'приключения',
    gender: 'мальчик',
    price: 1800,
    bookedDates: [new Date(2025, 11, 18)],
  },
  {
    id: 4,
    name: 'Волшебник',
    image: 'https://cdn.poehali.dev/projects/3af4e4b2-faf9-4ab7-bab5-aca147421294/files/a49ad539-95f5-4821-bc9e-4e60e43b4190.jpg',
    age: '7-10',
    theme: 'сказки',
    gender: 'любой',
    price: 1700,
    bookedDates: [],
  },
  {
    id: 5,
    name: 'Бабочка',
    image: 'https://cdn.poehali.dev/projects/3af4e4b2-faf9-4ab7-bab5-aca147421294/files/1f184ee0-bdea-4baf-8c3c-92992ddfd378.jpg',
    age: '3-5',
    theme: 'природа',
    gender: 'девочка',
    price: 1400,
    bookedDates: [new Date(2025, 11, 22)],
  },
  {
    id: 6,
    name: 'Космонавт',
    image: 'https://cdn.poehali.dev/projects/3af4e4b2-faf9-4ab7-bab5-aca147421294/files/8c7354c5-6a4c-49eb-bf98-3c985cfa1492.jpg',
    age: '5-7',
    theme: 'космос',
    gender: 'любой',
    price: 1900,
    bookedDates: [],
  },
];

export default function Index() {
  const [selectedAge, setSelectedAge] = useState<string>('all');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [cart, setCart] = useState<{ costume: Costume; date: Date | undefined }[]>([]);
  const [filterTab, setFilterTab] = useState<string>('simple');
  const [smartAge, setSmartAge] = useState<string>('');
  const [smartEvent, setSmartEvent] = useState<string>('');

  const filteredCostumes = costumes.filter((costume) => {
    if (selectedAge !== 'all' && costume.age !== selectedAge) return false;
    if (selectedTheme !== 'all' && costume.theme !== selectedTheme) return false;
    if (selectedGender !== 'all' && costume.gender !== selectedGender && costume.gender !== 'любой') return false;
    return true;
  });

  const smartFilteredCostumes = () => {
    if (filterTab !== 'smart') return filteredCostumes;

    let results = costumes;

    if (smartAge) {
      results = results.filter((c) => c.age === smartAge);
    }

    if (smartEvent === 'день рождения') {
      results = results.filter((c) => ['супергерои', 'сказки', 'приключения'].includes(c.theme));
    } else if (smartEvent === 'новый год') {
      results = results.filter((c) => ['сказки', 'волшебство'].includes(c.theme));
    } else if (smartEvent === 'карнавал') {
      results = results.filter((c) => ['природа', 'космос', 'приключения'].includes(c.theme));
    }

    return results;
  };

  const displayedCostumes = filterTab === 'smart' ? smartFilteredCostumes() : filteredCostumes;

  const addToCart = (costume: Costume, date: Date | undefined) => {
    setCart([...cart, { costume, date }]);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const isDateBooked = (date: Date, costume: Costume) => {
    return costume.bookedDates.some(
      (bookedDate) =>
        bookedDate.getDate() === date.getDate() &&
        bookedDate.getMonth() === date.getMonth() &&
        bookedDate.getFullYear() === date.getFullYear()
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🎭</div>
              <div>
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600">
                  МаскаРад
                </h1>
                <p className="text-sm text-gray-600">Аренда детских костюмов</p>
              </div>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="lg" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-pink-500 hover:bg-pink-600">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина заказов</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map((item, index) => (
                        <Card key={index}>
                          <CardContent className="pt-4">
                            <div className="flex items-start gap-3">
                              <img
                                src={item.costume.image}
                                alt={item.costume.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold">{item.costume.name}</h4>
                                <p className="text-sm text-gray-600">
                                  {item.date ? item.date.toLocaleDateString('ru-RU') : 'Дата не выбрана'}
                                </p>
                                <p className="text-sm font-semibold text-purple-600">{item.costume.price} ₽</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(index)}
                              >
                                <Icon name="Trash2" size={16} />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <div className="pt-4 border-t">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold">Итого:</span>
                          <span className="text-xl font-bold text-purple-600">
                            {cart.reduce((sum, item) => sum + item.costume.price, 0)} ₽
                          </span>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section className="py-12 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-4 animate-fade-in">
            Волшебный мир костюмов! ✨
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Превратите праздник в сказку — более 100 костюмов для вашего ребенка
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-lg">
            <div className="flex items-center gap-2">
              <Icon name="Calendar" size={24} />
              <span>Удобный календарь</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Truck" size={24} />
              <span>Доставка по улусу</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <Tabs value={filterTab} onValueChange={setFilterTab} className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="simple">Фильтры</TabsTrigger>
            <TabsTrigger value="smart">
              <Icon name="Sparkles" size={16} className="mr-2" />
              Умный подбор
            </TabsTrigger>
          </TabsList>

          <TabsContent value="simple" className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Возраст</label>
                <Select value={selectedAge} onValueChange={setSelectedAge}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите возраст" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все возрасты</SelectItem>
                    <SelectItem value="3-5">3-5 лет</SelectItem>
                    <SelectItem value="5-7">5-7 лет</SelectItem>
                    <SelectItem value="7-10">7-10 лет</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Тематика</label>
                <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тему" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все темы</SelectItem>
                    <SelectItem value="супергерои">Супергерои</SelectItem>
                    <SelectItem value="сказки">Сказки</SelectItem>
                    <SelectItem value="приключения">Приключения</SelectItem>
                    <SelectItem value="природа">Природа</SelectItem>
                    <SelectItem value="космос">Космос</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Пол ребенка</label>
                <Select value={selectedGender} onValueChange={setSelectedGender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите пол" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Любой</SelectItem>
                    <SelectItem value="мальчик">Мальчик</SelectItem>
                    <SelectItem value="девочка">Девочка</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="smart" className="space-y-4">
            <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Sparkles" size={20} />
                  Умная система подбора
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Возраст ребенка</label>
                  <Select value={smartAge} onValueChange={setSmartAge}>
                    <SelectTrigger>
                      <SelectValue placeholder="Сколько лет ребенку?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3-5">3-5 лет</SelectItem>
                      <SelectItem value="5-7">5-7 лет</SelectItem>
                      <SelectItem value="7-10">7-10 лет</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Для какого события?</label>
                  <Select value={smartEvent} onValueChange={setSmartEvent}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите событие" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="день рождения">День рождения</SelectItem>
                      <SelectItem value="новый год">Новый год</SelectItem>
                      <SelectItem value="карнавал">Карнавал</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {smartAge && smartEvent && (
                  <div className="p-4 bg-white rounded-lg">
                    <p className="text-sm text-gray-700">
                      <Icon name="CheckCircle2" size={16} className="inline mr-2 text-green-600" />
                      Подобрано <strong>{smartFilteredCostumes().length}</strong> костюмов для{' '}
                      {smartEvent} (возраст {smartAge})
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-bold">
            Каталог костюмов
            <Badge variant="secondary" className="ml-3">
              {displayedCostumes.length} шт.
            </Badge>
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCostumes.map((costume) => (
            <Card
              key={costume.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in"
            >
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    src={costume.image}
                    alt={costume.name}
                    className="w-full h-64 object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-purple-600">
                    {costume.age} лет
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <CardTitle className="mb-2">{costume.name}</CardTitle>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="outline">{costume.theme}</Badge>
                  <Badge variant="outline">{costume.gender}</Badge>
                </div>
                <p className="text-2xl font-bold text-purple-600">{costume.price} ₽/день</p>
              </CardContent>
              <CardFooter className="gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex-1">
                      <Icon name="Calendar" size={16} className="mr-2" />
                      Календарь
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>{costume.name} — Доступность</DialogTitle>
                    </DialogHeader>
                    <Calendar
                      mode="single"
                      className="rounded-md border"
                      modifiers={{
                        booked: costume.bookedDates,
                      }}
                      modifiersStyles={{
                        booked: {
                          backgroundColor: '#ef4444',
                          color: 'white',
                          fontWeight: 'bold',
                        },
                      }}
                      disabled={(date) => isDateBooked(date, costume)}
                    />
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded"></div>
                        <span>Занято</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-purple-600 rounded"></div>
                        <span>Доступно для аренды</span>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Арендовать
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Выберите дату аренды</DialogTitle>
                    </DialogHeader>
                    <Calendar
                      mode="single"
                      onSelect={(date) => {
                        if (date && !isDateBooked(date, costume)) {
                          addToCart(costume, date);
                        }
                      }}
                      className="rounded-md border"
                      modifiers={{
                        booked: costume.bookedDates,
                      }}
                      modifiersStyles={{
                        booked: {
                          backgroundColor: '#ef4444',
                          color: 'white',
                          fontWeight: 'bold',
                        },
                      }}
                      disabled={(date) => isDateBooked(date, costume)}
                    />
                    <p className="text-sm text-gray-600">
                      Выберите свободную дату для аренды костюма
                    </p>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>

        {displayedCostumes.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎭</div>
            <p className="text-xl text-gray-600">
              Костюмы по выбранным фильтрам не найдены
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSelectedAge('all');
                setSelectedTheme('all');
                setSelectedGender('all');
                setSmartAge('');
                setSmartEvent('');
              }}
            >
              Сбросить фильтры
            </Button>
          </div>
        )}
      </div>

      <footer className="bg-gradient-to-r from-purple-900 via-pink-900 to-orange-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-xl mb-4">МаскаРад</h4>
              <p className="text-purple-200">
                Аренда детских маскарадных костюмов для любого праздника
              </p>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-4">Контакты</h4>
              <div className="space-y-2 text-purple-200">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (999) 123-45-67
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@maskarad.ru
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-4">Доставка</h4>
              <ul className="space-y-2 text-purple-200">
                <li>✓ Борогонцы</li>
                <li>✓ Маягасцы</li>
                <li>✓ Чаран</li>
                <li>✓ Мындаба</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}