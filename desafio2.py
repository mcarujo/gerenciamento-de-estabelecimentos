import time
numero_de_entradas = int(input())
lista_de_tempos = []

# Verificando se entrada é inteiro
if(type(numero_de_entradas) != int):
    print("Por favor, execute novamente e digite um inteiro")
    exit

while(numero_de_entradas):
    inicio = time.time()
    palavra = input()
    fim = time.time()
    if len(palavra) >= 9 and len(palavra) <= 1000:
        lista_de_tempos.append(round(fim - inicio, 2))
        numero_de_entradas -= 1
    else:
        print("Número deve ser maior que 9 digitos e menor que 1000 digitos, desconsiderando entrada.")

print(lista_de_tempos)
exit
