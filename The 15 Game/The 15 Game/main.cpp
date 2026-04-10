#include <iostream>
#include <vector>

using namespace std;

vector<int> computerInventory;
vector<int> playerInventory;


void CheckIfSomeoneWon(vector<int> inv)
{
	int i = 0;
	int j = 1;
	int k = 2;

	int size = inv.size();


	while ((inv[i] + inv[j] + inv[k]) != 15)
	{
		while ((inv[i] + inv[j]) >= 15)
		{
			j++;

			if (j >= (size - 1))
			{
				i++;
				j = i + 1;
			}
		}

		if (j > k)
		{
			k = j + 1;
		}

		if (k > size)
		{

		}
	}
}

void CheckIfAnyoneWon()
{
	if ((playerInventory.size() < 3) and (computerInventory.size() < 3))
	{
		return;
	}

	CheckIfSomeoneWon(computerInventory);
	CheckIfSomeoneWon(playerInventory);
}

int main()
{
	int amountOfNumbers = 9;
	bool isPlayerStarting = true;

	bool hasComputerWon = false;
	bool hasPlayerWon = false;

	while (true)
	{
		vector<int> numbers;

		for (int i = 1; i < amountOfNumbers; i++)
		{
			numbers.push_back(i);
		}

		while ((hasComputerWon == false) and (hasPlayerWon == false))
		{
			CheckIfAnyoneWon();
		}

		if (hasComputerWon == true)
		{
			cout << "Defeat..." << endl;
		}

		if (hasPlayerWon == true)
		{
			cout << "You win !" << endl;
		}
	}
}